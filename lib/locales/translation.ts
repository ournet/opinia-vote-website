import {
  LocalizyLocalesProvider,
  LocalizyLocales,
  LocalesKey
} from "./generated-locales";
import { Locales } from "localizy";

export class OpiniaLocalesProvider extends LocalizyLocalesProvider<OpiniaLocales> {
  createInstance(t: Locales) {
    return new OpiniaLocales(t);
  }
}

export class OpiniaLocales extends LocalizyLocales {
  signNameById(id: number) {
    return this.v(`sign_${id}` as LocalesKey);
  }

  langByCode(lang: string) {
    return this.v(`lang_${lang}` as LocalesKey);
  }
}
