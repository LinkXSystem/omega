import EventEmitter from '../../src/engine/eventemitter';

describe('EventEmitter', () => {
  it('Proxy Test', () => {
    const emitter = new EventEmitter();

    emitter.on('message', data => {
      expect(data).toEqual('Hello, Omega !');
    });

    emitter.emit('message', 'Hello, Omega !');
  });
});
