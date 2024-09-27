import convertPhpArrayToJs from "./convertPhpArrayToJs";


export function parsePhpValue(node: any): any {
  switch (node.kind) {
    case 'string':
      return node.value;
    case 'array':
      return convertPhpArrayToJs(node);
    case 'encapsed':
      return node.value.map((part: any) => (part.kind === 'string' ? part.value : '')).join('');
    default:
      return null;
  }
}
