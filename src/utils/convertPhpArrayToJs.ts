import { parsePhpValue } from "./parsePhpValue";

function convertPhpArrayToJs(arrayNode: any): any {
  const result: any = {};

  for (const item of arrayNode.items) {
    let key;
    if (item.key && item.key.kind === 'string') {
      key = item.key.value;
    } else if (item.key === null) {
      // This is likely a numeric key
      key = Object.keys(result).length.toString();
    } else {
      // Skip other unsupported key types
      continue;
    }

    const value = parsePhpValue(item.value);
    result[key] = value;
  }

  return result;
}

export default convertPhpArrayToJs;
