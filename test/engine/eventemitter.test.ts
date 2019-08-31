import EventEmitter from '../../src/engine/eventemitter';

describe('EventEmitter', () => {
  it('Proxy Test', () => {
    const cache = new EventEmitter();

    const EventEmitterProxy = new Proxy(EventEmitter, {
      get(target, property) {
        return Reflect.get(target, property);
      },

      apply(target, ctx, args) {
        console.log('dala');
        // eslint-disable-line
        return Reflect.apply(target, ctx, args);
      }
    });

    // emitter.on('test', () => {
    //   console.log('test');
    // });

    new EventEmitterProxy().getName();

    console.dir(new EventEmitterProxy(), cache);
  });
});
