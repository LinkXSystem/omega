class Logger {
  prefix: string;

  static enable(prefix: string) {
    Logger.prototype.prefix = prefix;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static debug() {}

  static info(message: string) {
    console.log(
      Logger.prototype.prefix,
      new Date().toLocaleDateString(),
      message
    );
  }

  static warn(message: string) {
    console.warn(
      Logger.prototype.prefix,
      new Date().toLocaleDateString(),
      message
    );
  }

  static error(message: string) {
    console.error(
      Logger.prototype.prefix,
      new Date().toLocaleDateString(),
      message
    );
  }
}

export default Logger;
