import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';

import GlobalStyles from '~/components/GlobalStyles';
import BasketProvider from './contexts/BasketContext';
import store from './redux/store';

AOS.init({
  once: true,
  duration: 800,
  easing: 'linear',
});

const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <GlobalStyles>
            <BasketProvider>
              <Helmet>
                <title>{t('title')}</title>
              </Helmet>
              <App />
            </BasketProvider>
          </GlobalStyles>
        </I18nextProvider>
      </React.StrictMode>
    </Provider>
  );
}

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
