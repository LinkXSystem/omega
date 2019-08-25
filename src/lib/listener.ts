class Listener {
  static bind(element: HTMLElement | Window, event: string, callback: any) {
    console.log(callback.name);
    element.addEventListener(event, callback, false);
  }

  static unbind(element: HTMLElement | Window, event: string, callback: any) {
    console.log(callback);
    element.removeEventListener(event, callback, false);
  }
}

export default Listener;
