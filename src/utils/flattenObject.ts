function flattenObject(ob: any, prefix = '', result: any = {}) {
  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof ob[i] === 'object' && ob[i] !== null && !Array.isArray(ob[i])) {
        flattenObject(ob[i], pre + i, result);
      } else {
        result[pre + i] = ob[i];
      }
    }
  }
  return result;
}

export default flattenObject;
