import { useState } from 'react'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'

function Login({ onLogin }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin?.()
  }

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="Opening SILAT">
        <div className="sea-dots" aria-hidden="true" />

        <header className="brand login-brand-group">
          <img className="brand-logo login-brand-logo" src="/KKP.png" alt="Logo KKP" />
          <img className="brand-logo login-brand-logo" src="/SILAT NOBG.png" alt="Logo SILAT" />
        </header>

        <div className="hero-copy">
          <p className="eyebrow">Kementerian Kelautan dan Perikanan</p>
          <h1>
            Perizinan Berusaha Subsektor Penangkapan Ikan dan Subsektor Pengangkutan Ikan
          </h1>
        </div>

        <div className="sea-scene" aria-hidden="true">
          <div className="sea-horizon" />

          <svg className="boat" viewBox="0 0 180 100" fill="none">
            <path d="M22 63h133l-14 19H38L22 63Z" fill="var(--color-accent)" />
            <path d="M43 63V30h68l20 33" fill="var(--color-primary)" />
            <path d="M78 30V12h4v51" stroke="var(--color-text)" strokeWidth="3" />
            <path d="M82 14h38L82 42V14Z" fill="var(--color-accent)" />
            <path d="M19 84c34 8 86 8 143 0" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </svg>

          <svg className="fish fish-one" viewBox="0 0 56 30" fill="none">
            <path d="M5 15c10-11 26-11 39 0-13 11-29 11-39 0Z" fill="var(--color-accent)" />
            <path d="m43 15 9-8v16l-9-8Z" fill="var(--color-accent)" />
            <circle cx="15" cy="12" r="1.5" fill="var(--color-surface)" />
          </svg>

          <svg className="fish fish-two" viewBox="0 0 56 30" fill="none">
            <path d="M5 15c10-11 26-11 39 0-13 11-29 11-39 0Z" fill="var(--color-primary)" />
            <path d="m43 15 9-8v16l-9-8Z" fill="var(--color-primary)" />
          </svg>

          <svg className="fish fish-three" viewBox="0 0 56 30" fill="none">
            <path d="M5 15c10-11 26-11 39 0-13 11-29 11-39 0Z" fill="var(--color-accent)" opacity="0.75" />
            <path d="m43 15 9-8v16l-9-8Z" fill="var(--color-accent)" opacity="0.75" />
          </svg>

          <div className="wave" />
          <div className="wave wave-two" />
          <div className="wave wave-three" />
        </div>
      </section>

      <section className="login-panel" aria-label="Form login">
        <div className="login-card">
          <div className="login-header">
            <p>Selamat datang</p>
            <h2>Login ke akun Anda</h2>
            <span>Silakan masukkan Username dan Password untuk melanjutkan.</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" placeholder="Masukkan Username" autoComplete="username" required />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input id="password" name="password" type={isPasswordVisible ? 'text' : 'password'} placeholder="Masukkan Password" autoComplete="current-password" required />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={isPasswordVisible ? 'Sembunyikan password' : 'Tampilkan password'}
                  aria-pressed={isPasswordVisible}
                  onClick={() => setIsPasswordVisible((value) => !value)}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="w-4 h-4 text-slate-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            <label className="checkbox-row">
              <input type="checkbox" name="recaptcha" required />
              <span>Saya bukan robot</span>
              <small>reCAPTCHA</small>
            </label>

            <button type="submit" className="login-button">Login</button>
          </form>

          <p className="footer-note flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>&copy; 2026 SILAT · Direktorat Jenderal Perikanan Tangkap</span>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
