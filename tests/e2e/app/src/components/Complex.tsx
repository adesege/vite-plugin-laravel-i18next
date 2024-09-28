import React from 'react';
import { useTranslation } from 'react-i18next';

const Complex: React.FC = () => {
  const { t } = useTranslation('complex');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('deeply.nested.value')}</p>
      <ul>
        <li>{t('list.0')}</li>
        <li>{t('list.1')}</li>
      </ul>
      <p>{t('mixed.key', { number: 3 })}</p>
    </div>
  );
};

export default Complex;
