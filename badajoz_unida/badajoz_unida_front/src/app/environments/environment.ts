// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    authUrl: 'http://localhost:8080/api/auth/',
    url: 'http://localhost:8080/api',

    // tslint:disable-next-line: max-line-length
    token: ''
  },
  users : [
    { username: 'nacedo.dev@gmail.com', password: 'Nacedo123' },
    { username: 'fgc@hotmail.com', password: 'Pep234' },
  ],
  language: 'es',
  availableLanguages: ['es', 'en'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
