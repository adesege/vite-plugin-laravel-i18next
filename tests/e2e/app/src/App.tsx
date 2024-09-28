import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Fruits from './components/Fruits';
import Greeting from './components/Greeting';
import JsonTranslations from './components/JsonTranslations';
import Complex from './components/Complex';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select name="language" onChange={changeLanguage} value={i18n.language}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}

function Layout() {
  const { t } = useTranslation();

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">{t('home')}</Link></li>
          <li><Link to="/dashboard">{t('dashboard')}</Link></li>
          <li><Link to="/fruits">{t('fruits')}</Link></li>
          <li><Link to="/greeting">{t('greeting')}</Link></li>
          <li><Link to="/json-translations">{t('json_translations')}</Link></li>
          <li><Link to="/complex">{t('complex')}</Link></li>
        </ul>
      </nav>

      <LanguageSelector />

      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "fruits", element: <Fruits /> },
      { path: "greeting", element: <Greeting /> },
      { path: "json-translations", element: <JsonTranslations /> },
      { path: "complex", element: <Complex /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
