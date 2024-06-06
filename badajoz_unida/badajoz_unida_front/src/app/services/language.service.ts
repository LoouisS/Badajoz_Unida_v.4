// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {LocaleHelper} from '../config/locale-helper';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>(this.getInitialLocale());
  language$ = this.languageSubject.asObservable();

  constructor() {
  }

  changeLanguage(language: string) {
    // notificar a todos los suscriptores que el idioma ha cambiado
    this.languageSubject.next(language);
  }

  getLanguage(): string {
    // obtener el valor actual del idioma
    return this.languageSubject.getValue();
  }

  private getInitialLocale(): string {
    // Obtiene la información de configuración regional almacenada en la URL actual
    const storedLocaleId = LocaleHelper.getCultureFromCurrentUrl();

    // Si no hay configuración regional almacenada en la URL
    if (storedLocaleId == null) {
      let partialLocaleMatch = null;

      // Itera a través de todas las configuraciones regionales implementadas en la aplicación
      for (const implementedLocaleId of LocaleHelper.implementedLocales) {
        // Si la configuración regional del navegador coincide exactamente con una de las implementadas, la retorna
        if (navigator.language === implementedLocaleId) {
          return implementedLocaleId;
        } else if (navigator.language.startsWith(implementedLocaleId)) {
          // Si la configuración regional del navegador comienza con una de las implementadas
          // (por ejemplo, el navegador tiene `es-CL` y la implementada es `es`),
          // almacena la implementada en `partialLocaleMatch`
          partialLocaleMatch = implementedLocaleId;
        } else if (implementedLocaleId.startsWith(navigator.language)) {
          // Si la configuración regional implementada comienza con la configuración regional del navegador
          // (por ejemplo, el navegador tiene `es` y la implementada es `es-CL`)
          // almacena la implementada en `partialLocaleMatch`
          partialLocaleMatch = implementedLocaleId;
        }
      }

      // Si se encontró una coincidencia parcial, la retorna
      if (partialLocaleMatch != null) {
        return partialLocaleMatch;
      }
    }

    // Si no se encontró una coincidencia en la configuración regional almacenada en la URL ni en las implementadas,
    // retorna la configuración regional por defecto
    return storedLocaleId || LocaleHelper.defaultLocaleId;
  }
}
