export const toIntOrNull = (value: unknown) => {
  const v =
    typeof value === "number"
      ? Math.round(value)
      : typeof value === "string"
      ? parseInt(value, 10)
      : null;

  return Number.isFinite(v) ? v : null;
};
