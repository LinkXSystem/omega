interface Connector {
  refresh: Function;
}

class InputConnector implements Connector {
  constructor() {}

  refresh() {}
}

class OutputConnector implements Connector {
  constructor() {}

  refresh() {}
}

export { InputConnector, OutputConnector };
