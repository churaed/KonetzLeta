import { HeroSection } from './components/HeroSection';
import { TeamSection } from './components/TeamSection';
import { ShowreelSection } from './components/ShowreelSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <TeamSection />
      <ShowreelSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />

      {/* <style jsx>{`
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style> */}
    </div>
  );
}