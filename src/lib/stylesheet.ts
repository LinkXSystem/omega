class StyleSheet {
  static NumberOfStyle = [
    'width',
    'height',
    'top',
    'left',
    'right',
    'bottom',
    'border-radius',
  ];

  static compose(element: HTMLElement | SVGElement, style: Object) {
    const entries = Object.entries(StyleSheet.convert(style));
    entries.forEach(entry => {
      // Maybe that is not valid method, solve No.7015 problem !
      const [name, value] = entry;
      element.style[name] = value;
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

  static parser(styles: string) { }
}

export default StyleSheet;
