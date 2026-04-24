import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAuthError, loginAdmin } from '../redux/authSlice';
import { useT } from '../i18n/useT';
import LangThemeBar from './shared/LangThemeBar';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const t = useT();
  const { status, error } = useAppSelector(s => s.auth);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const { isAdminLoggedIn } = useAppSelector(s => s.auth);

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate('/admin', { replace: true });
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());
    await dispatch(loginAdmin({ email, token }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden noise"
      style={{ background: 'linear-gradient(145deg, var(--hero-from) 0%, #4a1010 40%, #6b4f0c 100%)' }}>

      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg,transparent,var(--gold-light),var(--gold),var(--gold-light),transparent)' }} />

      {/* Lang/Theme top right */}
      <div className="absolute top-4 right-6 z-20">
        <LangThemeBar dark compact />
      </div>

      {/* Orbs */}
      <div className="absolute top-24 right-20 w-64 h-64 rounded-full opacity-10 blur-3xl animate-float"
        style={{ background: 'radial-gradient(circle,var(--gold-light),transparent)' }} />
      <div className="absolute bottom-20 left-16 w-48 h-48 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle,var(--gold),transparent)' }} />

      <div className="relative w-full max-w-md z-10">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-sm transition-colors hover:opacity-80"
          style={{ color: 'rgba(232,201,122,0.6)' }}>
          ← {t.login_back.replace('← ', '')}
        </button>

        <div className="rounded-xl overflow-hidden shadow-2xl"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(232,201,122,0.2)' }}>

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center" style={{ borderBottom: '1px solid rgba(232,201,122,0.15)' }}>
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="absolute w-20 h-20 rounded-full blur-xl opacity-25 animate-float"
                style={{ background: 'radial-gradient(circle,var(--gold-light),transparent)' }} />
              <div className="relative w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(201,151,28,0.3), rgba(232,201,122,0.2))', border: '1px solid rgba(232,201,122,0.3)' }}>
                <span className="text-3xl">💎</span>
              </div>
            </div>
            <h1 className="font-display text-4xl font-bold text-white tracking-widest mb-1">{t.login_title}</h1>
            <p className="font-accent text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(232,201,122,0.6)' }}>
              {t.login_sub}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium font-accent tracking-widest uppercase"
              style={{ background: 'rgba(201,151,28,0.15)', border: '1px solid rgba(201,151,28,0.3)', color: 'var(--gold-light)' }}>
              🛡️ {t.login_portal}
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-accent text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: 'rgba(232,201,122,0.7)' }}>{t.login_email}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter admin email"
                  className="w-full rounded px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(232,201,122,0.2)', color: 'white' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,151,28,0.15)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(232,201,122,0.2)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div>
                <label className="block font-accent text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: 'rgba(232,201,122,0.7)' }}>{t.login_token}</label>
                <div className="relative">
                  <input type='text' value={token} onChange={e => setToken(e.target.value)} required placeholder="••••••••"
                    className="w-full rounded px-4 py-3 pr-12 text-sm focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(232,201,122,0.2)', color: 'white' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,151,28,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(232,201,122,0.2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {error && (
                <div className="rounded px-4 py-3 text-sm text-center"
                  style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5' }}>
                  {error || t.login_error}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn-gold w-full py-3.5 mt-1 rounded">
                {status === 'loading' ? t.login_loading : t.login_btn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
