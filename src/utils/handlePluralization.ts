type PluralRule = {
  condition: string;
  translation: string;
};

type PluralRuleCondition = string;

export default function handlePluralization(obj: Record<string, unknown>, lang: string): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (typeof value === 'string' && value.includes('|')) {
      const pluralRules = parsePluralRules(value);
      Object.assign(result, applyPluralRules(key, pluralRules, lang));
    } else {
      result[key] = value;
    }
    return result;
  }, {} as Record<string, unknown>);
}

function parsePluralRules(value: string): PluralRule[] {
  const parts = value.split('|');
  if (parts.length === 2) {
    return [
      { condition: '{1}', translation: parts[0].trim() },
      { condition: 'other', translation: parts[1].trim() }
    ];
  }
  return parts.map(parsePluralRule).filter((rule): rule is PluralRule => rule !== null);
}

function parsePluralRule(part: string): PluralRule | null {
  const match = part.match(/^\s*(\{[^}]+\}|\[[^\]]+\])\s*(.+)/);
  if (!match) return null;
  const [, condition, translation] = match;
  return { condition, translation: translation.trim() };
}

function applyPluralRules(key: string, rules: PluralRule[], lang: string): Record<string, string> {
  return rules.reduce((result, { condition, translation }) => {
    const suffix = getPluralSuffix(condition, lang);
    if (suffix) {
      result[`${key}_${suffix}`] = translation;
    }
    return result;
  }, {} as Record<string, string>);
}

function getPluralSuffix(condition: PluralRuleCondition, lang: string): string | null {
  if (condition === '{0}' || condition === '[0]') return 'zero';
  if (condition === '{1}' || condition === '[1]') return 'one';
  if (lang === 'ar' && (condition === '{2}' || condition === '[2]')) return 'two';
  if (condition.includes(',') || condition === 'other') return 'other';
  return null;
}
