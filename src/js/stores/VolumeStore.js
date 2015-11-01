import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import dispatcher from '../dispatcher';

let volume = 0;
let muted = false;

const VolumeStore = assign(new EventEmitter, {
  getVolume() {
    return volume;
  },

  isMuted() {
    return muted;
  },

  dispatchToken: dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'setVolume':
      volume = payload.volume;
      VolumeStore.emit('change');
      break;
    case 'mute':
      muted = true;
      VolumeStore.emit('change');
      break;
    case 'unmute':
      muted = false;
      VolumeStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default VolumeStore;
