class Listener {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static bind(element: HTMLElement | SVGElement | Window, event: string, callback: any) {
    element.addEventListener(event, callback, false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static unbind(element: HTMLElement | SVGElement | Window, event: string, callback: any) {
    element.removeEventListener(event, callback, false);
  }
}

export default Listener;
