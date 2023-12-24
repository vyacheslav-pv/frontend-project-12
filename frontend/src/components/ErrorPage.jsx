import { useTranslation } from 'react-i18next';
import error404 from '../images/error-404.jpg';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        alt={t('errorPage.h1text')}
        className="img-fluid h-25"
        src={error404}
      />
      <h1 className="h4 text-muted">{t('errorPage.h1text')}</h1>
      <p className="text-muted">
        {t('errorPage.ptext')}
        <a href="/">{t('errorPage.textLink')}</a>
      </p>
    </div>
  );
};

export default ErrorPage;
