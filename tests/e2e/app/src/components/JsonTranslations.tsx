import React from 'react';
import { useTranslation } from 'react-i18next';

const JsonTranslations: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('json-translations:welcome')}</h1>
      <p>{t('json-translations:goodbye')}</p>
    </div>
  );
};

export default JsonTranslations;
