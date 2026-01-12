import mammoth from "mammoth";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await mammoth.convertToHtml({ buffer });

  return Response.json({ html: result.value });
}
