// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authService: {
    baseUrl: 'https://adocicamel.auth0.com/',
    clientId: 'Ogd6yezRELPImCpuEWkhYXMcyD6aZx5K',
    clienteSecret: '4pueg3dYx2fZDSiESlgfG9Hkfq3_tfyGH_6L_bOvGvPcDkg2vEvti-drjXXXcLgg',
    audience: 'https://adocicamel.auth0.com/api/v2/'
  },
  apiBaseUrl: "http://www.mocky.io/",
  productServiceInterface: {
    url: "https://adocicamel.azure-api.net",
    SubscriptionKey: "b19ad0ad208345e986dcbe1abe38fbbb"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
