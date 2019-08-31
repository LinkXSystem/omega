import Events from 'events';

class EventEmitter {
  getName() {
    console.log('dala');
  }

  on(event: string, callback: Function) {
    console.log(event, callback);
  }
}

export default EventEmitter;
