import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLang } from '../../redux/uiSlice';
import { COUNTRY_OPTIONS, LANG_OPTIONS } from '../../i18n/translations';
import type { Lang } from '../../i18n/translations';

interface Props {
  compact?: boolean;
  dark?: boolean;
}

export default function LangThemeBar({ dark = false }: Props) {
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector(s => s.ui);
  // const isDark = theme === 'dark';
  const [open, setOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const countryDropRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const countryBtnRef = useRef<HTMLButtonElement>(null);
  const [dropPos, setDropPos] = useState({ top: 0, right: 0 });
  const [countryDropPos, setCountryDropPos] = useState({ top: 0, right: 0 });

  const currentLang = LANG_OPTIONS.find(o => o.value === lang);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
      if (countryDropRef.current && !countryDropRef.current.contains(e.target as Node)) setCountryOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleOpen() {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setOpen(o => !o);
  }

  function handleCountryOpen() {
    if (countryBtnRef.current) {
      const rect = countryBtnRef.current.getBoundingClientRect();
      setCountryDropPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setCountryOpen(o => !o);
  }

  const btnBase = dark
    ? { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#e8c97a' }
    : { background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">

      {/* Country dropdown */}
      <div ref={countryDropRef} className="relative">
        <button
          ref={countryBtnRef}
          onClick={handleCountryOpen}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-accent tracking-wide transition-all hover:opacity-80"
          style={btnBase}
        >
          <span className="text-sm leading-none">🌍</span>
          <span className="hidden sm:block">Countries</span>
          <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${countryOpen ? 'rotate-180' : ''}`} />
        </button>

        {countryOpen && (
          <div
            className="fixed z-[9999] rounded-xl shadow-xl overflow-hidden"
            style={{
              top: countryDropPos.top,
              right: countryDropPos.right,
              width: '220px',
              background: dark ? 'rgba(30,15,5,0.97)' : 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Header */}
            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
              <p className="font-accent text-[10px] tracking-widest uppercase" style={{ color: dark ? 'rgba(232,201,122,0.5)' : 'var(--text-muted)' }}>
                Available in {COUNTRY_OPTIONS.length} countries
              </p>
            </div>

            {/* Country list */}
            <div className="overflow-y-auto" style={{ maxHeight: '260px' }}>
              {COUNTRY_OPTIONS.map((opt, i) => (
                <div
                  key={opt.value}
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{
                    borderBottom: i < COUNTRY_OPTIONS.length - 1 ? '1px solid var(--border-light)' : 'none',
                  }}
                >
                  <span
                    className="font-accent text-xs tracking-wide"
                    style={{ color: dark ? 'rgba(232,201,122,0.85)' : 'var(--text-primary)' }}
                  >
                    {opt.native}
                  </span>
                  <span
                    className="text-[10px] font-accent tracking-widest uppercase"
                    style={{ color: dark ? 'rgba(255,255,255,0.3)' : 'var(--text-muted)' }}
                  >
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-4 py-2.5 flex items-center justify-center gap-1.5"
              style={{ borderTop: '1px solid var(--border-light)', background: dark ? 'rgba(201,151,28,0.08)' : 'var(--bg-subtle)' }}
            >
              <span className="text-xs" style={{ color: dark ? 'rgba(232,201,122,0.5)' : 'var(--text-muted)' }}>
                🌟 Worldwide shipping available
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-5 flex-shrink-0" style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'var(--border-light)' }} />

      {/* Language dropdown */}
      <div ref={dropRef} className="relative">
        <button
          ref={btnRef}
          onClick={handleOpen}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-accent tracking-wide transition-all hover:opacity-80"
          style={btnBase}
        >
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="max-w-[52px] truncate">{currentLang?.native || 'EN'}</span>
          <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div
            className="fixed w-36 rounded-xl shadow-xl z-[9999] overflow-hidden"
            style={{
              top: dropPos.top,
              right: dropPos.right,
              background: dark ? 'rgba(30,15,5,0.97)' : 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {LANG_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => { dispatch(setLang(opt.value as Lang)); setOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs transition-all hover:opacity-80"
                style={{
                  background: lang === opt.value
                    ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))'
                    : 'transparent',
                  color: lang === opt.value ? 'white' : dark ? 'rgba(232,201,122,0.75)' : 'var(--text-secondary)',
                }}
              >
                <span className="font-accent tracking-wide">{opt.native}</span>
                <span className="opacity-50 text-[10px]">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      {/* <div className="w-px h-5 flex-shrink-0" style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'var(--border-light)' }} /> */}

      {/* Theme toggle */}
      {/* <button
        onClick={() => dispatch(toggleTheme())}
        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80 flex-shrink-0"
        title={isDark ? 'Light Mode' : 'Dark Mode'}
        style={btnBase}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button> */}
    </div>
  );
}