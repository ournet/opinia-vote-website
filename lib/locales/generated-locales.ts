
import { Locales, Translator, TranslatorOptions } from 'localizy';

export class LocalizyLocalesProvider<T extends LocalizyLocales = LocalizyLocales> {
    private translator: Translator
    private localesMap: { [lang: string]: T } = {}

    constructor(options: TranslatorOptions) {
        this.translator = new Translator(options);
    }

    lang(lang: string) {
        if (!this.localesMap[lang]) {
            this.localesMap[lang] = this.createInstance(this.translator.locales(lang)) as T;
        }

        return this.localesMap[lang];
    }

    protected createInstance(t: Locales): T {
        return new LocalizyLocales(t) as T;
    }
}

export class LocalizyLocales {
    protected __locales: Locales
    constructor(locales: Locales) {
        this.__locales = locales;
    }

    s(key: LocalesKey, ...args: any[]) {
        return this.v(key, args);
    }

    v(key: LocalesKey, args?: any[]) {
        return this.__locales.t(key, args);
    }
    

    home() {
        return this.v('home');
    }

    statements() {
        return this.v('statements');
    }

    statement() {
        return this.v('statement');
    }

    authors() {
        return this.v('authors');
    }
}

export type LocalesKey = 'home'
    | 'statements'
    | 'statement'
    | 'authors';
