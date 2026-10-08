import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './PartnerDetectionLogo.css';

export function PartnerDetectionLogo({ logo, name }: { logo: string; name: string }) {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current !== null) clearTimeout(timeout.current);
  }, []);

  function reveal() {
    if (timeout.current !== null) clearTimeout(timeout.current);
    setRevealed(true);
    timeout.current = setTimeout(() => setRevealed(false), 2000);
  }

  return <button
    type="button"
    className="partner-detection rounded-2xl bg-white px-6 py-4"
    data-revealed={revealed}
    aria-label={t('portfolio.items.houyhnhnms.partner_detection', { name })}
    onPointerUp={event => { if (event.pointerType !== 'mouse') reveal(); }}
    onClick={event => { if (event.detail === 0) reveal(); }}
  >
    <img src={logo} alt={name} className="h-10 w-auto max-w-[200px] object-contain" loading="lazy" />
    <span className="partner-detection-box text-red-400" aria-hidden="true">
      <span className="partner-detection-label">#01 {name}</span>
    </span>
  </button>;
}
