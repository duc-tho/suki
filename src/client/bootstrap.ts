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
        this.calcAppScreenSize();

        window.addEventListener('resize', () => {
            this.calcAppScreenSize();
        });
    }

    calcAppScreenSize() {
        const windowHeight = `${window.innerHeight}px`
        const core = document.getElementById('core')!;
        const appBackground = document.getElementById('appBackground')!;
        const particle = document.getElementById('tsparticles')!;
        core.style.height = windowHeight < (window as any).screenHeight ? (window as any).screenHeight : windowHeight;

        if (window.innerWidth < 640) {
            appBackground.style.height = windowHeight;
            particle.style.height = windowHeight;
        }
    }
}

export const bootstrap = new Bootstrap();
