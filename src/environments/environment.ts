// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyAsHZJdQUKgISTuZvvsb1NJIo-_1cnQIJw",
    authDomain: "drinking-rules.firebaseapp.com",
    databaseURL: "https://drinking-rules.firebaseio.com",
    projectId: "drinking-rules",
    storageBucket: "drinking-rules.appspot.com",
    messagingSenderId: "678672580848"
  }
};
