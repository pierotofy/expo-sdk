'use strict';

import { NativeModules, DeviceEventEmitter } from 'react-native';

const RNAdMobInterstitial = NativeModules.RNAdMobInterstitial;

const eventHandlers = {
  interstitialDidLoad: new Map(),
  interstitialDidFailToLoad: new Map(),
  interstitialDidOpen: new Map(),
  interstitialDidClose: new Map(),
  interstitialWillLeaveApplication: new Map(),
};

const addEventListener = (type, handler) => {
  switch (type) {
    case 'interstitialDidLoad':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'interstitialDidFailToLoad':
      eventHandlers[type].set(
        handler,
        DeviceEventEmitter.addListener(type, error => {
          handler(error);
        })
      );
      break;
    case 'interstitialDidOpen':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'interstitialDidClose':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'interstitialWillLeaveApplication':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    default:
      console.log(`Event with type ${type} does not exist.`);
  }
};

const removeEventListener = (type, handler) => {
  if (!eventHandlers[type].has(handler)) {
    return;
  }
  eventHandlers[type].get(handler).remove();
  eventHandlers[type].delete(handler);
};

const removeAllListeners = () => {
  DeviceEventEmitter.removeAllListeners('interstitialDidLoad');
  DeviceEventEmitter.removeAllListeners('interstitialDidFailToLoad');
  DeviceEventEmitter.removeAllListeners('interstitialDidOpen');
  DeviceEventEmitter.removeAllListeners('interstitialDidClose');
  DeviceEventEmitter.removeAllListeners('interstitialWIllLeaveApplication');
};

module.exports = {
  ...RNAdMobInterstitial,
  requestAd: (cb = () => {}) => RNAdMobInterstitial.requestAd(cb), // requestAd callback is optional
  showAd: (cb = () => {}) => RNAdMobInterstitial.showAd(cb), // showAd callback is optional
  addEventListener,
  removeEventListener,
  removeAllListeners,
  setAdUnitId: id => {
    RNAdMobInterstitial.setAdUnitID(id);
    console.warn(`setAdUnitId will be deprecated soon. Please use setAdUnitID instead.`);
  },
};
