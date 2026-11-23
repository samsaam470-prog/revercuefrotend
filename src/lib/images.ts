import { filesApi } from "../api/files";
import { API_BASE_URL } from "../api/client";

/**
 * Image intake for the builders.
 *
 * The file is resized in the browser, then uploaded to Revercue storage, so the
 * document stores a short URL instead of a base64 blob. The stored URL is
 * stable (no expiry) because document images live under a public key.
 */
const MAX_EDGE = 1400;
const MAX_BYTES = 12 * 1024 * 1024;

const API_BASE = ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "").trim() || "https://api.revercue.co.uk";

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file (PNG, JPEG, WebP or GIF).");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("That image is larger than 12 MB. Use a smaller file.");
  }

  const prepared = await prepareFile(file);
  const result = await filesApi.upload(prepared, "document-image");
  if (!result?.key) throw new Error("The image could not be uploaded.");
  const relative = result.url && result.url.startsWith("/") ? result.url : `/api/files/${result.key}`;
  return relative.startsWith("http") ? relative : `${API_BASE.replace(/\/$/, "")}${relative}`;
}

async function prepareFile(file: File): Promise<File> {
  if (file.type === "image/gif" && file.size < 900 * 1024) return file;

  const raw = await readFile(file);
  const image = await loadImage(raw);
  const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(image, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((value) => resolve(value), "image/jpeg", 0.85);
  });
  if (!blob) return file;
  return new File([blob], file.name.replace(/\.[a-z0-9]+$/i, ".jpg"), { type: "image/jpeg" });
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

/** Backwards-compatible alias for callers that still expect the old name. */
export const imageToDataUrl = uploadImage;