import { getMessaging } from 'firebase/messaging';
import { FirebaseConfig } from './../../core/config/FirebaseConfig';
import { initializeApp } from 'firebase/app';

export const firebaseApp = initializeApp(FirebaseConfig);
export const firebaseMessaging = getMessaging(firebaseApp);
