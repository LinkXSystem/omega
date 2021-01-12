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

  static compose(element: HTMLElement | SVGElement, style: Record<string, any>) {
    const entries = Object.entries(StyleSheet.convert(style));
    entries.forEach(entry => {
      // Maybe that is not valid method, solve No.7015 problem !
      const [name, value] = entry;
      element.style[name] = value;
    });
  }

  static convert(style: Record<string, any>, unit = 'px') {
    const entries = Object.entries(style);
    const temp = Object.create(null);

    entries.forEach(entry => {
      // eslint-disable-next-line prefer-const
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static parser(styles: string) { }
}

export default StyleSheet;
