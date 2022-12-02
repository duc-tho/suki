import { getToken } from "firebase/messaging";
import { firebaseMessaging } from "./services/firebase/Firebase";

const calcAppScreenSize = () => {
    const core = document.getElementById('core')!;
    core.style.height = `${(window as any).screenHeight}px`;
}

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
        calcAppScreenSize();
    }
}

export const bootstrap = new Bootstrap();
