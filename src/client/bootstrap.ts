import { LOCAL_STORAGE } from './core/constants/LocalStorage';
import { getToken } from "firebase/messaging";
import { firebaseMessaging } from "./services/firebase/Firebase";

class Bootstrap {
    excute() {
        this.enableFirebaseServiceWorker();
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

    enableResizeEvent(isKeyboardOpen = false) {
        this.calcAppScreenSize(isKeyboardOpen);

        window.addEventListener('resize', () => {
            this.calcAppScreenSize(isKeyboardOpen);
        });
    }

    calcAppScreenSize(isKeyboardOpen = false) {
        const screenHeight = `${window.screen.height}px`;
        const windowHeight = `${window.innerHeight}px`
        const core = document.getElementById('core')!;
        const appBackground = document.getElementById('appBackground')!;
        const particle = document.getElementById('tsparticles')!;
        core.style.height = screenHeight;

        if (window.innerWidth < 640) {
            appBackground.style.height = windowHeight;
            particle.style.height = windowHeight;
        }
    }
}

export const bootstrap = new Bootstrap();
