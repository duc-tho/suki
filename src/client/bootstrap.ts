import { getToken } from "firebase/messaging";
import { firebaseMessaging } from "./services/firebase/Firebase";

const calcAppScreenSize = () => {
    const core = document.getElementById('core')!;
    const appBackground = document.getElementById('appBackground')!;
    core.style.height = `${(window as any).screenHeight}px`;

    if ((window as any).screenWidth < 640) {
        appBackground.style.height = `${(window as any).screenHeight}px`;
    }
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
