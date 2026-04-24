import { Star } from 'lucide-react';
import { useAppDispatch } from '../redux/hooks';
import { setView } from '../redux/authSlice';
import { useT } from '../i18n/useT';
import LangThemeBar from './shared/LangThemeBar';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const t = useT();

  return (
    <div className="min-h-screen relative overflow-hidden noise flex flex-col"
      style={{ background: 'linear-gradient(145deg, var(--hero-from) 0%, #4a1010 35%, #7a2a2a 65%, var(--hero-to) 100%)' }}>

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold), var(--gold-light), transparent)' }} />

      {/* Lang/Theme bar */}
      <div className="relative z-20 flex justify-end px-6 pt-4">
        <LangThemeBar dark />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-16 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float"
        style={{ background: 'radial-gradient(circle, var(--gold-light), transparent)' }} />
      <div className="absolute bottom-20 left-12 w-56 h-56 rounded-full opacity-8 blur-3xl animate-float"
        style={{ background: 'radial-gradient(circle, var(--gold), transparent)', animationDelay: '2s' }} />

      {/* Decorative corner SVG */}
      <svg className="absolute top-0 left-0 w-48 h-48 opacity-10" viewBox="0 0 200 200">
        <circle cx="20" cy="20" r="3" fill="#e8c97a" opacity="0.5" />
        <circle cx="60" cy="10" r="2" fill="#e8c97a" opacity="0.4" />
        <circle cx="10" cy="60" r="2" fill="#e8c97a" opacity="0.4" />
        <path d="M0 0 C60 0 100 40 100 100" stroke="#e8c97a" strokeWidth="0.5" fill="none" opacity="0.4" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-48 h-48 opacity-10" viewBox="0 0 200 200">
        <circle cx="180" cy="180" r="3" fill="#e8c97a" opacity="0.5" />
        <circle cx="140" cy="190" r="2" fill="#e8c97a" opacity="0.4" />
        <circle cx="190" cy="140" r="2" fill="#e8c97a" opacity="0.4" />
        <path d="M200 200 C140 200 100 160 100 100" stroke="#e8c97a" strokeWidth="0.5" fill="none" opacity="0.4" />
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 py-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--gold-light))' }} />
          <span className="font-accent text-xs tracking-[0.5em] uppercase" style={{ color: 'var(--gold-light)' }}>
            {t.home_eyebrow}
          </span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--gold-light), transparent)' }} />
        </div>

        {/* Gem icon with glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full opacity-20 blur-2xl animate-float"
            style={{ background: 'radial-gradient(circle, var(--gold-light), transparent)' }} />
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: 'rgba(232,201,122,0.4)', background: 'rgba(255,255,255,0.05)' }}>
            <span className="text-5xl">💎</span>
          </div>
        </div>

        <h1 className="font-display text-7xl md:text-9xl font-bold text-white tracking-widest leading-none mb-2 animate-slide-up">
          KUBERA RATNA
        </h1>
        <p className="gold-text font-display text-2xl italic font-light mb-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t.home_tagline}
        </p>

        {/* Star divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.5))' }} />
          <Star className="w-3 h-3" style={{ fill: 'var(--gold-light)', color: 'var(--gold-light)' }} />
          <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(232,201,122,0.5), transparent)' }} />
        </div>

        <p className="text-white/40 text-base font-light leading-relaxed mb-10 max-w-md">{t.home_sub}</p>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm">
          <button onClick={() => dispatch(setView('user-store'))}
            className="group glass-dark rounded-xl p-7 text-left hover:bg-white/10 transition-all duration-300 hover:border-yellow-600/50 cursor-pointer"
            style={{ border: '1px solid rgba(232,201,122,0.2)' }}>
            <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform inline-block">🛍️</span>
            <p className="font-display text-2xl text-white font-light mb-1">{t.home_shop}</p>
            <p className="text-white/35 text-xs leading-relaxed">{t.home_shop_desc}</p>
            <p className="mt-5 text-xs font-accent tracking-[0.25em] uppercase transition-colors group-hover:opacity-80"
              style={{ color: 'var(--gold-light)' }}>{t.home_shop_cta}</p>
          </button>

          <button onClick={() => dispatch(setView('admin-login'))}
            className="group glass-dark rounded-xl p-7 text-left hover:bg-white/10 transition-all duration-300 hover:border-yellow-600/50 cursor-pointer"
            style={{ border: '1px solid rgba(232,201,122,0.2)' }}>
            <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform inline-block">🛡️</span>
            <p className="font-display text-2xl text-white font-light mb-1">{t.home_admin}</p>
            <p className="text-white/35 text-xs leading-relaxed">{t.home_admin_desc}</p>
            <p className="mt-5 text-xs font-accent tracking-[0.25em] uppercase transition-colors group-hover:opacity-80"
              style={{ color: 'var(--gold-light)' }}>{t.home_admin_cta}</p>
          </button>
        </div>

        <p className="text-white/15 text-xs mt-10 tracking-widest font-accent">{t.home_footer}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold), var(--gold-light), transparent)' }} />
    </div>
  );
}
