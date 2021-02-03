export class StyleSheet {
  static NumberOfStyle = [
    'width',
    'height',
    'top',
    'left',
    'right',
    'bottom',
    'border-radius',
  ];

  static compose(element: HTMLElement | SVGElement, style: Record<string, number | string>) {
    const entries = Object.entries(StyleSheet.convert(style));
    entries.forEach(entry => {
      // Maybe that is not valid method, solve No.7015 problem !
      const [name, value] = entry;
      element.style[name] = value;
    });
  }

  static convert(style: Record<string, number | string>, unit = 'px') {
    const entries = Object.entries(style);
    const temp = Object.create(null);

    entries.forEach(entry => {

      const [name, value] = entry;
      let _value = value;
      if (
        StyleSheet.NumberOfStyle.includes(name) &&
        typeof value === 'number'
      ) {
        _value = `${value}${unit}`;
      }

      temp[name as string] = _value;
    });

    return temp;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static parser(styles: string) { }
}
