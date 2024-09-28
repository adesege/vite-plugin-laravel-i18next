import React from 'react';
import { useTranslation } from 'react-i18next';

const Fruits: React.FC = () => {
  const { t } = useTranslation('fruits');

  return (
    <div>
      <h1>{t('title')}</h1>
      <ul>
        <li>{t('apples', { count: 0 })}</li>
        <li>{t('apples', { count: 1 })}</li>
        <li>{t('apples', { count: 2 })}</li>
        <li>{t('apples', { count: 5 })}</li>
      </ul>
    </div>
  );
};

export default Fruits;
