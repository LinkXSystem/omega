class StyleSheet {
  static compose(element: HTMLElement, style: Object) {
    const entries = Object.entries(style);
    entries.forEach(entry => {
      // Maybe that is not valid method, solve No.7015 problem !
      const [name, value] = entry;
      element.style[name as any] = value;
    });
  }
}

export default StyleSheet;
