import { Engine, Node } from "php-parser";
import convertPhpArrayToJs from "./convertPhpArrayToJs";

function parseLaravelPhpArray(content: string): any {
  const parser = new Engine({
    parser: {
      extractDoc: true,
      php7: true,
    },
    ast: {
      withPositions: true,
    },
  });

  const ast = parser.parseCode(content, 'file.php');
  const returnNode = ast.children.find((node) => node.kind === 'return') as Node & { expr: { kind: string; items: any[] } };

  if (returnNode && returnNode.expr.kind === 'array') {
    return convertPhpArrayToJs(returnNode.expr);
  }

  return {};
}

export default parseLaravelPhpArray;
