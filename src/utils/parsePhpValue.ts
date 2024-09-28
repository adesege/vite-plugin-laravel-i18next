import convertPhpArrayToJs from "./convertPhpArrayToJs";

const handleOffsetLookup = (node: any) => {
  const parts = [
    node.what.what.name,
    node.what.offset.value,
    node.offset.value,
  ].filter(Boolean).join('.');

  return `{{${parts}}}`;
}

export function parsePhpValue(node: any): any {
  /* v8 ignore next */
  if (!node) return null;

  switch (node.kind) {
    case 'string':
      return node.value;
    case 'number':
      return Number(node.value);
    case 'boolean':
      return node.value;
    case 'array':
      return convertPhpArrayToJs(node);
    case 'encapsed':
      return node.value.map((part: any) => {
        if (part.expression.kind === 'string') {
          return part.expression.value;
        } else if (part.expression.kind === 'variable') {
          return `{{${part.expression.name}}}`;
        } else if (part.expression.kind === 'offsetlookup') {
          if (part.expression.what.kind === 'offsetlookup') {
            return handleOffsetLookup(part.expression);
          }

          // Handle array access like $user['name']
          return `{{${part.expression.what.name}.${part.expression.offset.value}}}`;
        } /* v8 ignore next */

        /* v8 ignore next */
        return '';
      }).join('');
    default:
      return null;
  }
}
