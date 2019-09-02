import { Connector } from '../modules/connector/index';
import EventEmitter from './eventemitter';

class Runtime {
  connector: Connector;

  emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;

    this.register();
  }

  register() {
    this.emitter.on('mousedown', (data: Object) => {
      console.log('dala', data);
    });
  }
}

export default Runtime;
