type FlattenedObject = Record<string, unknown>;

function flattenObject(obj: Record<string, unknown>, prefix = '', result: FlattenedObject = {}): FlattenedObject {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (isNestedObject(value)) {
      flattenObject(value as Record<string, unknown>, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

function isNestedObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export default flattenObject;
