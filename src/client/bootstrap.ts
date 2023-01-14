import { AppBackgroundUtils } from './core/utils/AppBackgroundUtils';
import { LOCAL_STORAGE } from './core/constants/LocalStorage';
import { getToken } from "firebase/messaging";
import { firebaseMessaging } from "./services/firebase/Firebase";

class Bootstrap {
    excute() {
        this.enableFirebaseServiceWorker();
        this.enableResizeEvent();
    }

    enableFirebaseServiceWorker() {
        let currentPushToken = localStorage.getItem(LOCAL_STORAGE.PUSH_TOKEN);

        getToken(firebaseMessaging, { vapidKey: process.env.FB_VAPID_KEY }).then((pushToken) => {
            if (currentPushToken === pushToken) {
                return;
            }

            localStorage.setItem(LOCAL_STORAGE.PUSH_TOKEN, pushToken);
        })
    }

    enableResizeEvent() {
        let appBackground: AppBackgroundUtils|null = null;
        window.addEventListener('resize', () => {
            if (!appBackground) appBackground = new AppBackgroundUtils();

            appBackground.calcAppScreenSize();
        });
    }
}

export const bootstrap = new Bootstrap();
