export function buildAssetUrl({ baseUrl = "", folderLocation = "", fileName = "" } = {}) {
  if (!fileName) return "";
  if (/^https?:\/\//i.test(fileName)) return fileName;

  const base = String(baseUrl || "").replace(/\/+$/, "");
  const folder = String(folderLocation || "").replace(/^\/+|\/+$/g, "");
  const file = String(fileName).replace(/^\/+/, "");

  return [base, folder, file].filter(Boolean).join("/");
}
