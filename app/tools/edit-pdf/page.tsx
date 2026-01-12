import type { Metadata } from "next";
import EditClient from "./EditClient";

export const metadata: Metadata = {
  title: "Edit PDF - Add Text to PDF Online",
  description:
    "Add custom text, change font sizes, and pick colors to edit your PDF online. Fast, free, and secure browser-side editing.",
};

export default function EditPage() {
  return <EditClient />;
}
