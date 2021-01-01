import { OpiniaLocalesProvider } from "./translation";
import { parseTranslationData } from "localizy";

const locales = new OpiniaLocalesProvider({
  data: {
    ro: parseTranslationData(require("../../public/static/locales/ro.json"))
  }
});

const useTranslation = (lang: string) => locales.lang(lang);
export default useTranslation;
