export function getRecordId(record, keys = ["id", "_id"]) {
  if (!record) return "";

  const keyList = Array.isArray(keys) ? keys : [keys];
  const value = keyList.map((key) => record?.[key]).find(Boolean);
  return value ? String(value) : "";
}

export function getActivePrice(
  item,
  { priceKey = "price", discountPriceKey = "discountPrice" } = {}
) {
  const price = Number(item?.[priceKey] || 0);
  const discountPrice = Number(item?.[discountPriceKey] || 0);
  return discountPrice > 0 && discountPrice < price ? discountPrice : price;
}

export function formatCurrency(
  value,
  {
    locale = "en-IN",
    currency = "INR",
    maximumFractionDigits = 2,
    minimumFractionDigits,
  } = {}
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
    ...(minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}),
  }).format(Number(value || 0));
}

export function formatDateTime(
  value,
  {
    locale = "en-IN",
    fallback = "Not available",
    dateStyle = "medium",
    timeStyle = "short",
  } = {}
) {
  if (!value) return fallback;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat(locale, { dateStyle, timeStyle }).format(date);
}

export function readableLabel(value) {
  return String(value || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .trim()
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

export function formatAddress(address = {}, fields) {
  const addressFields = fields || [
    "line1",
    "line2",
    "city",
    "state",
    "postalCode",
    "country",
  ];

  return addressFields
    .map((field) => address?.[field])
    .filter(Boolean)
    .join(", ");
}

export function getInitials(name) {
  if (!name || typeof name !== "string") return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
