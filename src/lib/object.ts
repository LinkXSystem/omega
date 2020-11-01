function isEmpty(target: Record<string, any>): boolean {
  return Boolean(!Object.keys(target).length);
}

export default {
  isEmpty
};
