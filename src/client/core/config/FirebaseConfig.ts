/** Example
 *  {
 *      apiKey: 'api-key',
 *      authDomain: 'project-id.firebaseapp.com',
 *      databaseURL: 'https://project-id.firebaseio.com',
 *      projectId: 'project-id',
 *      storageBucket: 'project-id.appspot.com',
 *      messagingSenderId: 'sender-id',
 *      appId: 'app-id',
 *      measurementId: 'G-measurement-id',
 *  }
 */

export const FirebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID,
}
