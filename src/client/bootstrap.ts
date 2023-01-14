import { AppBackgroundUtils } from './core/utils/AppBackgroundUtils';
import { READY_STATE } from './core/constants/Common';
import { LOCAL_STORAGE } from './core/constants/LocalStorage';
import { getToken } from "firebase/messaging";
import { firebaseMessaging } from "./services/firebase/Firebase";

class Bootstrap {
    AppBackground: AppBackgroundUtils|null = null;

    excute() {
        this.AppBackground = new AppBackgroundUtils();
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
        document.addEventListener('readystatechange', () => {
            if (document.readyState === READY_STATE.COMPLETE) {
                this.AppBackground.calcAppScreenSize();
            }
        });

        window.addEventListener('resize', () => {
            this.AppBackground.calcAppScreenSize();
        });
    }
}

export const bootstrap = new Bootstrap();
