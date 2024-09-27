function handlePluralization(translations: Record<string, any>) {
  const result: Record<string, any> = {};

  for (const key in translations) {
    if (Object.prototype.hasOwnProperty.call(translations, key)) {
      const value = translations[key];
      if (typeof value === 'string' && value.includes('|')) {
        const parts = value.split('|');
        if (parts.length === 2) {
          result[key] = {
            one: parts[0].trim(),
            other: parts[1].trim(),
          };
        } else {
          result[key] = {};
          for (const part of parts) {
            const [count, text] = part.split(':').map((s) => s.trim());
            if (count && text) {
              result[key][count] = text;
            } else {
              result[key]['other'] = part.trim();
            }
          }
        }
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}

export default handlePluralization;
