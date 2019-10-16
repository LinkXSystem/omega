class StyleSheet {
  static NumberOfStyle = ['width', 'height', 'top', 'left', 'right', 'bottom'];

  static compose(element: HTMLElement, style: Object) {
    const entries = Object.entries(style);
    entries.forEach(entry => {
      // Maybe that is not valid method, solve No.7015 problem !
      const [name, value] = entry;
      element.style[name as any] = value;
    });
  }

  static convert(style: Object, unit = 'px') {
    const entries = Object.entries(style);
    let temp = Object.create(null);

    entries.forEach(entry => {
      let [name, value] = entry;
      if (
        StyleSheet.NumberOfStyle.includes(name) &&
        typeof value === 'number'
      ) {
        value = `${value}${unit}`;
      }

      temp[name as any] = value;
    });

    return temp;
  }
}

export default StyleSheet;
