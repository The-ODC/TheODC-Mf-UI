export function getRecordId(record, keys = ["id", "_id"]) {
  if (!record) return "";
  if (typeof record === "string") return record.trim();
  if (typeof record === "number") return String(record);

  const keyList = Array.isArray(keys) ? keys : [keys];
  const value = keyList
    .map((key) => record?.[key])
    .find((v) => v !== undefined && v !== null && v !== "");
  return value ? String(value).trim() : "";
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
    showSymbol = true,
    maximumFractionDigits = 2,
    minimumFractionDigits,
  } = {}
) {
  let numericValue = 0;
  if (typeof value === "number") {
    numericValue = Number.isNaN(value) ? 0 : value;
  } else if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.-]+/g, "");
    numericValue = cleaned ? Number(cleaned) : 0;
    if (Number.isNaN(numericValue)) numericValue = 0;
  }

  const options = {
    maximumFractionDigits,
    ...(minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}),
  };

  if (showSymbol && currency) {
    options.style = "currency";
    options.currency = currency;
  }

  return new Intl.NumberFormat(locale, options).format(numericValue);
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
