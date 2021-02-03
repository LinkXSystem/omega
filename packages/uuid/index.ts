class UUID {
  /**
   * @description 参考文章： https://github.com/simongong/js-stackoverflow-highest-votes/blob/master/questions1-10/how-to-create-a-UUID-in-javascript.md
   */
  static generate() {
    let date = new Date().getTime();

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
      c,
    ) {
      const r = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });

    return uuid;
  }
}

export default UUID;
