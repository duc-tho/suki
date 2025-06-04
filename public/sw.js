/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-f6195dc0'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "android-icon-144x144.png",
    "revision": null
  }, {
    "url": "android-icon-192x192.png",
    "revision": null
  }, {
    "url": "android-icon-36x36.png",
    "revision": null
  }, {
    "url": "android-icon-48x48.png",
    "revision": null
  }, {
    "url": "android-icon-72x72.png",
    "revision": null
  }, {
    "url": "android-icon-96x96.png",
    "revision": null
  }, {
    "url": "apple-icon-114x114.png",
    "revision": null
  }, {
    "url": "apple-icon-120x120.png",
    "revision": null
  }, {
    "url": "apple-icon-144x144.png",
    "revision": null
  }, {
    "url": "apple-icon-152x152.png",
    "revision": null
  }, {
    "url": "apple-icon-180x180.png",
    "revision": null
  }, {
    "url": "apple-icon-57x57.png",
    "revision": null
  }, {
    "url": "apple-icon-60x60.png",
    "revision": null
  }, {
    "url": "apple-icon-72x72.png",
    "revision": null
  }, {
    "url": "apple-icon-76x76.png",
    "revision": null
  }, {
    "url": "apple-icon-precomposed.png",
    "revision": null
  }, {
    "url": "apple-icon.png",
    "revision": null
  }, {
    "url": "favicon-16x16.png",
    "revision": null
  }, {
    "url": "favicon-32x32.png",
    "revision": null
  }, {
    "url": "favicon-96x96.png",
    "revision": null
  }, {
    "url": "favicon.ico",
    "revision": null
  }, {
    "url": "firebase-messaging-sw.js",
    "revision": null
  }, {
    "url": "logo.png",
    "revision": null
  }, {
    "url": "ms-icon-144x144.png",
    "revision": null
  }, {
    "url": "ms-icon-150x150.png",
    "revision": null
  }, {
    "url": "ms-icon-310x310.png",
    "revision": null
  }, {
    "url": "ms-icon-70x70.png",
    "revision": null
  }, {
    "url": "sw.js",
    "revision": null
  }, {
    "url": "workbox-f6195dc0.js",
    "revision": null
  }, {
    "url": "assets/app-BPNtZ6XO.js",
    "revision": null
  }, {
    "url": "assets/app-BzZTti5l.css",
    "revision": null
  }, {
    "url": "assets/manifest.webmanifest",
    "revision": null
  }, {
    "url": "images/backgrounds/bg-1.png",
    "revision": null
  }, {
    "url": "images/backgrounds/bg-2.png",
    "revision": null
  }, {
    "url": "images/backgrounds/bg-3.png",
    "revision": null
  }, {
    "url": "images/backgrounds/bg-4.png",
    "revision": null
  }, {
    "url": "images/backgrounds/bg-5.png",
    "revision": null
  }, {
    "url": "images/icons/tikdown-icon.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661330335-embarassed.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661468778-shy2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661609494-stir.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661759357-window.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661769739-bang2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661809802-shy3.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661849306-overwhelmed.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1528661860093-embarassed2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538982947123-morning2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538982958110-night2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983171225-bequite.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983209585-aloha.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983656280-burnt.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983673155-fan.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983690892-fever.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983706465-goodjob.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983884206-havesomeair.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983913809-myeyes.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538983957781-money2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984016976-shocked.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984268983-roll.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984310763-cheers.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984343653-slurp.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984381231-nom2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984418168-nom3.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984553411-bringiton.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984761170-bored2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538984946077-thankyou.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985010813-shocked2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985029940-great.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985046915-dingdong4.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985074795-kasakasa.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985091172-kasakasa2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985129479-nono.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985166282-thefuck.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985184583-doublethumbs.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985207948-nom4.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985255943-party.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985274822-study.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985289685-study2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985325474-yeah.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985352065-chillout.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985414777-punch2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985445060-happy.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985464049-wow.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985493590-hungry.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985540071-pervert.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985559372-pervert2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985607923-tehee.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985661184-pout2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985690345-drumroll.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985794471-ganbare.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538985813522-ok2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986089357-zzz.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986158829-fingerguns.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986190398-good.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986208370-nervous.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986238582-love.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986257110-tired.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986272731-knock.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986289399-dingdong.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986304755-nom.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986320269-really.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986338717-morning.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986351489-night.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986368976-bored.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986385383-sad.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986403714-hey.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986462922-annoyed.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986491997-huh.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986544690-huh2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986577173-wink.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986598343-love2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986612085-love3.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986626928-fueee.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986640276-sob.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986663600-pout.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986684139-impossible.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986702246-damn.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986731025-pout3.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986767311-pout4.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986790336-who.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986816594-wave.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986871589-yessir.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986886709-ok.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538986903701-lazy.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987699491-peek.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987706904-peek2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987765556-pillowcry.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987794131-cold.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987857557-sleepy.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987876046-sleeping.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987920079-bathtime.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987936426-salute.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987951967-music.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987969738-bang.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538987990293-plop.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988026532-thumbsup.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988073060-punch.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988097045-food.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988121881-squat.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988204370-eww.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988231793-noway.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988270747-money.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988308765-hello.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988336260-hurray.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988352464-o.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988362895-o2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988424560-x.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988433644-x2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988471590-understand.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988500189-police.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988578184-think.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988600305-cat.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988629237-ponder.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988650013-dingdong2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988663026-dingdong3.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988687905-swing.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988700511-swing2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538988752865-pwn.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992451764-no.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992461736-full.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992498236-yes.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992594966-forgiveme.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992608214-iforgive.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992755747-smug.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992967246-hot.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538992979420-tired2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993010623-crying.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993123136-nooo.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993145859-pout5.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993209863-hah.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993223348-hah2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993266659-blush.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993293299-blush2.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993323368-whatup.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1538993371340-badsmell.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1539244118832-notlike.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1539244157580-dogeza.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1539244175925-awoken.png",
    "revision": null
  }, {
    "url": "images/stickers/menhera/menhera-1539244283574-devastated.png",
    "revision": null
  }, {
    "url": "/",
    "revision": "v1"
  }, {
    "url": "manifest.webmanifest",
    "revision": "01dece7db06afe51e6c884ead428d49c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/"), {
    denylist: [/^\/*\/sw\.js$/, /^\/*\/manifest\.webmanifest$/, /^\/*\/android-icon.*\.png$/, /^\/*\/logo\.png$/, /^\/api\//]
  }));
  workbox.registerRoute(/\/videos\/backgrounds\/.*\.mp4$/, new workbox.CacheFirst({
    "cacheName": "suki-video-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [200]
    })]
  }), 'GET');

}));
