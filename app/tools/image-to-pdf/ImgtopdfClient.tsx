"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  Image as ImageIcon,
  Trash2,
  Download,
  Plus,
  GripVertical,
} from "lucide-react";
import ProcessingModal from "../../component/ProcessingModal";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ImageItem = {
  id: string;
  file: File;
  preview: string;
};

/* ---------------- Sortable Item ---------------- */

function SortableImage({
  img,
  index,
  onRemove,
}: {
  img: ImageItem;
  index: number;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-[3/4] rounded-lg overflow-hidden border bg-white"
    >
      <img
        src={img.preview}
        alt="preview"
        className="w-full h-full object-cover"
      />

      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1.5 bg-black/60 text-white rounded opacity-0 group-hover:opacity-100 cursor-grab"
        title="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1 text-center font-bold">
        Page {index + 1}
      </div>
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function ImgtopdfClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const sensors = useSensors(useSensor(PointerSensor));

  /* Cleanup blob URLs */
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newImages = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    const copy = [...images];
    URL.revokeObjectURL(copy[index].preview);
    copy.splice(index, 1);
    setImages(copy);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const convertImagesToPdf = async () => {
    if (!images.length) return;

    setIsProcessing(true);
    setProgress(10);

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    try {
      for (let i = 0; i < images.length; i++) {
        setProgress(10 + Math.round(((i + 1) / images.length) * 80));

        const img = images[i];
        const data = await getImageData(img.preview);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const props = doc.getImageProperties(data);
        const imgWidth = pageWidth;
        const imgHeight = (props.height * imgWidth) / props.width;
        const y = (pageHeight - imgHeight) / 2;

        if (i > 0) doc.addPage();
        doc.addImage(data, "JPEG", 0, y, imgWidth, imgHeight);
      }

      setTimeout(() => {
        doc.save("officekit.io-images.pdf");
        setProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          setProgress(0);
        }, 800);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed");
      setIsProcessing(false);
    }
  };

  const getImageData = (url: string): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d")?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <ProcessingModal isOpen={isProcessing} progress={progress} />

      <div className="max-w-4xl mx-auto bg-white rounded-2xl border p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Image to PDF</h1>

        {/* Upload */}
        <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer bg-green-50 mb-8">
          <ImageIcon className="w-10 h-10 text-green-500 mb-2" />
          <span className="text-sm font-semibold">Upload images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Sortable Grid */}
        {images.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {images.map((img, i) => (
                  <SortableImage
                    key={img.id}
                    img={img}
                    index={i}
                    onRemove={() => removeImage(i)}
                  />
                ))}

                <label className="flex items-center justify-center aspect-[3/4] border-2 border-dashed rounded-lg cursor-pointer">
                  <Plus className="w-8 h-8 text-gray-300" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </SortableContext>
          </DndContext>
        )}

        <button
          onClick={convertImagesToPdf}
          disabled={!images.length}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:bg-gray-300"
        >
          <Download className="w-5 h-5" />
          Create PDF
        </button>
      </div>
    </div>
  );
}
