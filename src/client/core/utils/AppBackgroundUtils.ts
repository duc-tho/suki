import { ELEMENT_TAG_NAME } from './../constants/HTMLElement';
import { isMobile } from './ReponsiveUtils';

export class AppBackgroundUtils {
    core: HTMLElement;
    backgroundElement: HTMLElement;
    backgroundSourceElement: HTMLVideoElement;
    particleElement: HTMLElement;
    window: Window|any;

    constructor() {
        this.core = document.getElementById('core')!;
        this.backgroundElement = document.getElementById('appBackground')!;
        this.backgroundSourceElement = this.backgroundElement.firstElementChild! as HTMLVideoElement;
        this.particleElement = document.getElementById('tsparticles')!;
        this.window = window;
    }

    calcAppScreenSize() {
        const windowHeightStyle = `${window.innerHeight}px`;
        const isBackgroundSourceElementUseVideo = this.backgroundSourceElement?.nodeName
            && this.backgroundSourceElement?.nodeName === ELEMENT_TAG_NAME.VIDEO;

        this.core.style.height = window.innerHeight < this.window.screenHeight
            ? this.window.screenHeight
            : windowHeightStyle;

        if (isBackgroundSourceElementUseVideo) {
            this.handleVideoBackground();
        }

        if (isMobile()) {
            this.backgroundElement.style.height = windowHeightStyle;
            this.particleElement.style.height = windowHeightStyle;
        }
    }

    setFullAppBackground(fullWidth = false, backgroundElement: HTMLVideoElement|HTMLImageElement) {
        if (fullWidth) {
            backgroundElement.style.height = 'unset';
            backgroundElement.style.width = '100%';
        } else {
            backgroundElement.style.height = '100%';
            backgroundElement.style.width = 'unset';
        }
    }

    handleVideoBackground() {
        const videoElement: HTMLVideoElement = this.backgroundSourceElement;
        const isBackgroundFullHeight = videoElement.clientHeight === window.innerHeight;
        const isBackgroundFullWidth = videoElement.clientWidth === window.innerWidth;
        const SET_FULL_HEIGHT = false;
        const SET_FULL_WIDTH = true;

        if (isBackgroundFullHeight) {
            if (videoElement.clientWidth <= window.innerWidth) {
                this.setFullAppBackground(SET_FULL_WIDTH, videoElement);
            }

            if (videoElement.clientWidth > window.innerWidth) {
                this.setFullAppBackground(SET_FULL_HEIGHT, videoElement);
            }
        }

        if (isBackgroundFullWidth) {
            if (videoElement.clientHeight <=  window.innerHeight) {
                this.setFullAppBackground(SET_FULL_HEIGHT, videoElement);
            }

            if (videoElement.clientHeight >  window.innerHeight) {
                this.setFullAppBackground(SET_FULL_WIDTH, videoElement);
            }
        }
    }
}
