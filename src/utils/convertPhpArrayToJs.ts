import { parsePhpValue } from "./parsePhpValue";

function convertPhpArrayToJs(arrayNode: any): any {
  const result: any = {};

  for (const item of arrayNode.items) {
    let key;
    if (item.key.kind === 'string' || item.key.kind === 'number') {
      key = item.key.value;
    } else {
      continue; // Unsupported key type
    }

    const value = parsePhpValue(item.value);
    result[key] = value;
  }

  return result;
}

export default convertPhpArrayToJs;
