import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroSection } from './components/HeroSection';
import { TeamSection } from './components/TeamSection';
import { ShowreelSection } from './components/ShowreelSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Navbar } from './components/Navbar';
import { PrivacyNotice } from './components/PrivacyNotice';
import { PrivacyPage } from './components/PrivacyPage';
import { ManifestPage } from './components/ManifestPage';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {location.pathname !== '/privacy' && location.pathname !== '/manifest' && <Navbar />}

      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white overflow-x-hidden">
              {/* Sections */}
              <HeroSection />
              <TeamSection />
              <ShowreelSection />
              <PortfolioSection />
              <ServicesSection />
              <ContactSection />
              <footer className="py-20 text-center border-t border-gray-800">
                <Link
                  to="/privacy"
                  className="text-gray-500 hover:text-red-400 font-mono text-sm transition-colors duration-200 inline-block min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {t('footer.privacy_policy')}
                </Link>
              </footer>
              <PrivacyNotice />
            </div>
          }
        />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/manifest" element={<ManifestPage />} />
      </Routes>

      {/* <style jsx>{`
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style> */}
    </>
  );
}