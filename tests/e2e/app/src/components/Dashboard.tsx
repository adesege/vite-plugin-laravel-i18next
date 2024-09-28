import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('dashboard:title')}</h1>
      <h2>{t('dashboard:users.title')}</h2>
      <p>{t('dashboard:users.list')}</p>
    </div>
  );
};

export default Dashboard;
