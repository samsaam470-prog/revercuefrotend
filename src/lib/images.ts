/**
 * Image intake for the builders.
 *
 * The file is resized and re-encoded in the browser before it is written into
 * the document, so an upload stays small enough to travel inside the document
 * JSON and render on the public page, in the preview and in the PDF without a
 * second storage hop. Nothing leaves the browser.
 */
const MAX_EDGE = 1400;
const MAX_BYTES = 12 * 1024 * 1024;

export async function imageToDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file (PNG, JPEG, WebP or GIF).");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("That image is larger than 12 MB. Use a smaller file.");
  }

  const raw = await readFile(file);
  if (file.type === "image/gif" && file.size < 900 * 1024) return raw;

  const image = await loadImage(raw);
  const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return raw;
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("That file could not be read."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("That image could not be opened."));
    image.src = src;
  });
}
