export const toIntOrNull = (value: unknown) => {
  const v =
    typeof value === "number"
      ? Math.round(value)
      : typeof value === "string"
      ? parseInt(value, 10)
      : null;

  return Number.isFinite(v) ? v : null;
};

export const buildUrl = (path: string, query: any) => {
  const q = Object.keys(query || {}).map(
    (key) => `${key}=${encodeURIComponent(query[key])}`
  );

  return q.length > 0 ? `${path}?${q.join("&")}` : path;
};

export const filterValues = <T>(values: unknown[], arr: T[]) =>
  arr.filter((item) => !values.includes(item));

export const filterUndefined = <T>(arr: T[]) => filterValues([undefined], arr);
