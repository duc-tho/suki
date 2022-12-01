import { getToken } from "firebase/messaging";
import { firebaseMessaging } from "./services/firebase/Firebase";

class Bootstrap {
    excute() {
        this.enableFirebaseServiceWorker();
        this.enableResizeEvent();
    }

    enableFirebaseServiceWorker() {
        getToken(firebaseMessaging, { vapidKey: process.env.FB_VAPID_KEY }).then((data) => {
            console.log(data);
        })
    }

    enableResizeEvent() {
        window.addEventListener('resize', () => {
            const body = document.getElementsByTagName('body')[0];
            body.style.width = `${window.innerWidth}px`;
            body.style.height = `${window.innerHeight}px`;
        });
    }
}

export const bootstrap = new Bootstrap();
