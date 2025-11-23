import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">{t('privacy_page.title')}</h1>
        <div className="space-y-6 prose prose-invert max-w-none">
          <ol className="list-decimal space-y-4 pl-6">
            <li>
              <strong>{t('privacy_page.sections.general.title')}</strong>
              <p>{t('privacy_page.sections.general.p1')}</p>
              <p>{t('privacy_page.sections.general.p2')}</p>
            </li>
            <li>
              <strong>{t('privacy_page.sections.data.title')}</strong>
              <p>{t('privacy_page.sections.data.p1')}</p>
              <p>{t('privacy_page.sections.data.p2')}</p>
            </li>
            <li>
              <strong>{t('privacy_page.sections.purposes.title')}</strong>
              <p>{t('privacy_page.sections.purposes.p1')}</p>
              <ul className="list-disc space-y-1 pl-6 mt-2">
                <li>{t('privacy_page.sections.purposes.li1')}</li>
                <li>{t('privacy_page.sections.purposes.li2')}</li>
              </ul>
            </li>
            <li>
              <strong>{t('privacy_page.sections.transfer.title')}</strong>
              <p>{t('privacy_page.sections.transfer.p1')}</p>
            </li>
            <li>
              <strong>{t('privacy_page.sections.storage.title')}</strong>
              <p>{t('privacy_page.sections.storage.p1')}</p>
            </li>
            <li>
              <strong>{t('privacy_page.sections.contact.title')}</strong>
              <p>{t('privacy_page.sections.contact.p1')}</p>
              <p>{t('privacy_page.sections.contact.p2')}</p>
            </li>
          </ol>
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-mono text-sm tracking-wide rounded-full transition-colors duration-200"
          >
            {t('privacy_page.back_home')}
          </Link>
        </div>
      </div>
    </div>
  );
}