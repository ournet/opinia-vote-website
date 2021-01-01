import { parseTranslationData } from "localizy";
import { OpiniaLocalesProvider } from "./translation";

const locales = new OpiniaLocalesProvider({
  data: {
    ro: parseTranslationData(require("../../public/static/locales/ro.json"))
  }
});

export default locales;