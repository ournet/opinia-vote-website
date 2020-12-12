export default (
  name: string,
  {
    size,
    lang,
    country
  }: { size: "a" | "b" | "c" | "d"; lang: string; country?: string }
) =>
  [
    `https://cdn.entipic.com`,
    `${lang}${country ? `-${country}` : ""}`,
    size,
    encodeURIComponent(
      name.replace(/[\s_]/g, " ").trim().replace(/[\s]+/g, "_")
    ) + ".jpg"
  ].join("/");
