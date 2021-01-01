import { useRouter } from "next/router";
import locales from "./locales";

const useTranslation = (lang?: string) =>
  locales.lang(lang || useRouter().locale || "");

export default useTranslation;
