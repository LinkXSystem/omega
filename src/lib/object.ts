function isEmpty(target: Object): boolean {
  return Boolean(!Object.keys(target).length);
}

export default {
  isEmpty
};
