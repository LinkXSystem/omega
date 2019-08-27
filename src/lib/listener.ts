class Listener {
  static bind(element: HTMLElement | Window, event: string, callback: any) {
    element.addEventListener(event, callback, false);
  }

  static unbind(element: HTMLElement | Window, event: string, callback: any) {
    element.removeEventListener(event, callback, false);
  }
}

export default Listener;
