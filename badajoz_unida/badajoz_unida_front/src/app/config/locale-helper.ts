import { environment } from "../environments/environment";


export abstract class LocaleHelper {
    public static defaultLocaleId = 'en';
public static implementedLocales = ['es', LocaleHelper.defaultLocaleId, 'fr'];

public language = environment.language;


public static setCurrentLocale(localeId: string) {
  // Set the new locale. Assume localeId is valid.
  const urlLocaleId = LocaleHelper.getCultureFromCurrentUrl();
  if (urlLocaleId) {
    // Replace current locale in url if any.
    if (localeId !== LocaleHelper.defaultLocaleId) {
      window.location.href = window.location.href.replace(`/${urlLocaleId}/`, `/${localeId.toLowerCase()}/`);
    } else {
      window.location.href = window.location.href.replace(`/${urlLocaleId}/`, '/');
    }
  } else {
    // If there is no locale in the url, add one.
    // Do not add one if it is the default locale.
    if (localeId !== LocaleHelper.defaultLocaleId) {
      const newUrl = window.location.href.replace(window.location.pathname,  `/${localeId}` + window.location.pathname);
      if (newUrl !== window.location.href) {
        window.location.href = newUrl;
      }
    }
  }
}

public static isDefaultLocaleSet(): boolean {
 return LocaleHelper.getCurrentLocale() === environment.language;
}

  static getCultureFromCurrentUrl(): string {
    // Retrieve localeId from the url if any.
    const matches = window.location.href.match(/\/[#][a-z]{2}\//gi);
    let urlLocaleId = null;
    if (matches) {
      urlLocaleId = matches[0].replace(/\//gi, '').replace('#', '');
      localStorage.setItem('language', urlLocaleId);
    }
    return urlLocaleId;
  }


  public static getCurrentLocale(): string {
 // Retrieve localeId from the url if any; otherwise, default to 'es'.
 // The first time the app loads, check the browser language.
 const storedLocaleId = LocaleHelper.getCultureFromCurrentUrl();

 if (storedLocaleId == null) {
   let partialLocaleMatch = null;
   // tslint:disable-next-line:forin
   for (const id in LocaleHelper.implementedLocales) {
     const implemetedLocaleId = LocaleHelper.implementedLocales[id];
     if (navigator.language === implemetedLocaleId) {
       // Exact match, return.
       return implemetedLocaleId;
     } else if (navigator.language.startsWith(implemetedLocaleId)) {
       // For example, browser has `es-CL` and the implemented locale is `es`.
       partialLocaleMatch = implemetedLocaleId;
     } else if (implemetedLocaleId.startsWith(navigator.language)) {
       // For example, browser has `es` and the implemented locale is `es-CL`.
       partialLocaleMatch = implemetedLocaleId;
     }
   }
   if (partialLocaleMatch != null) { return partialLocaleMatch; }
 }
 return storedLocaleId || this.defaultLocaleId;
}

}
