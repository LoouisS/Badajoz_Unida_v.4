import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {interceptorProvider} from "./security/services/interceptors/prod-interceptor.service";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {SharedModule} from "./shared/shared.module";
import { CesionImagenComponent } from './components/modals/cesion-imagen/cesion-imagen.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from 'angular-datatables';
import { Resources } from './resources';
import { LanguageService } from './services/language.service';
import localeEsExtra from '@angular/common/locales/extra/es';
import { UsuariosService } from './services/usuarios.service';


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    DataTablesModule
  ],
  providers: [interceptorProvider,
    NgbModal],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private languageService: LanguageService, private userService: UsuariosService) {
    // LocaleHelper.setCurrentLocale(LocaleHelper.getCurrentLocale());
    // Preload all the needed locales.
    registerLocaleData(localeEs, 'es', localeEsExtra);

    this.userService.getUser().subscribe((user:any) => {
      // Este bloque se ejecuta cada vez que el observador CurrentUser (currentUser$) de 'authService' emite un nuevo valor

      // Si el usuario es válido
      if (user) {
        // Obtiene el idioma asociado al usuario basado en su identificador
        const idioma = user.idioma.id;

        // Si el idioma es válido
        if (idioma) {
          // Cambia el idioma del servicio de idioma
          this.languageService.changeLanguage(idioma);
        }
      }
    });

    this.languageService.language$.subscribe((language) => {
      // Este bloque se ejecuta cada vez que el observador de idioma (language$) del 'languageService' emite un nuevo valor

      // Importa el recurso de traducción correspondiente al idioma actual
      console.log(language);
      import(`../assets/translation/resources.${language.toLowerCase()}.js`).then((r) => {

        // Itera a través de todas las claves en el recurso de traducción importado
        for (const key in r.resources) {

          // Verifica si la clave existe en el objeto de recursos
          if (r.resources.hasOwnProperty(key)) {
            // Si es así, asigna el valor de la traducción a la clave correspondiente en el objeto 'Resources'
            Resources[key] = r.resources[key];
          }
        }
      });
    });
  }
 }
