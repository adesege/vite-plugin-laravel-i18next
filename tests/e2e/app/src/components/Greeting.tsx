import React from 'react';
import { useTranslation } from 'react-i18next';

const Greeting: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('greeting:title')}</h1>
      <p>{t('greeting:hello', { name: 'John' })}</p>
      <p>{t('greeting:balance', { amount: '100' })}</p>
    </div>
  );
};

export default Greeting;
