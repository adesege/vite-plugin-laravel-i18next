type PluralForm = 'zero' | 'one' | 'other' | string & {};
type TranslationValue = string | Record<PluralForm, string>;
type Translations = Record<string, TranslationValue>;

function isPluralizable(value: TranslationValue): value is string {
  return typeof value === 'string' && value.includes('|');
}

function parsePluralForms(value: string): Record<PluralForm, string> {
  const parts = value.split('|');
  return parts.reduce<Record<PluralForm, string>>((pluralForms, part) => {
    const { form, text } = parsePluralPart(part, pluralForms);
    if (Array.isArray(form)) {
      form.forEach(f => {
        pluralForms[f] = text;
      });
    } else {
      pluralForms[form] = text;
    }
    return pluralForms;
  }, {} as Record<PluralForm, string>);
}

function parsePluralPart(part: string, pluralForms: Record<PluralForm, string>): { form: PluralForm | PluralForm[], text: string } {
  const exactMatch = part.match(/^\{(\d+)\}\s*(.*)$/);
  const rangeMatch = part.match(/^\[(\d+),(\*|\d+)\]\s*(.*)$/);
  const colonMatch = part.split(':').map(s => s.trim());

  if (exactMatch) {
    return handleExactMatch(exactMatch);
  } else if (rangeMatch) {
    return handleRangeMatch(rangeMatch);
  } else if (colonMatch.length === 2) {
    return handleColonMatch(colonMatch);
  } else {
    return handleSimplePlural(part.trim(), pluralForms);
  }
}

function handleExactMatch([, count, text]: RegExpMatchArray): { form: PluralForm, text: string } {
  return { form: count === '1' ? 'one' : count, text: text.trim() };
}

function handleRangeMatch([, start, end, text]: RegExpMatchArray): { form: PluralForm[], text: string } {
  if (end === '*') {
    return { form: ['other'], text: text.trim() };
  }
  const range = Array.from({ length: Number(end) - Number(start) + 1 }, (_, i) => String(Number(start) + i));
  return { form: range, text: text.trim() };
}

function handleColonMatch([count, text]: string[]): { form: PluralForm, text: string } {
  return { form: count === '1' ? 'one' : count, text };
}

function handleSimplePlural(text: string, pluralForms: Record<PluralForm, string>): { form: PluralForm, text: string } {
  return { form: 'one' in pluralForms ? 'other' : 'one', text };
}

function handlePluralization(translations: Translations): Translations {
  return Object.fromEntries(
    Object.entries(translations).map(([key, value]) => [
      key,
      isPluralizable(value) ? parsePluralForms(value) : value
    ])
  );
}

export default handlePluralization;
