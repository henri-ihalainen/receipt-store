import { AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyDV61KXZ7wSq5d9kIpkaphDK6NzUnX1tOk',
  authDomain: 'receipt-store-b3c62.firebaseapp.com',
  databaseURL: 'https://receipt-store-b3c62.firebaseio.com',
  storageBucket: 'gs://receipt-store-b3c62.appspot.com',
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};
