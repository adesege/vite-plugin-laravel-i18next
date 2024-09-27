function handleInterpolation(translations: Record<string, any>) {
  const result: Record<string, any> = {};

  for (const key in translations) {
    if (Object.prototype.hasOwnProperty.call(translations, key)) {
      let value = translations[key];
      if (typeof value === 'string') {
        value = value.replace(/:([a-zA-Z_]+)/g, '{{$1}}');
      }
      result[key] = value;
    }
  }

  return result;
}

export default handleInterpolation;
