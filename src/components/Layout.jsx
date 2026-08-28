import Navbar from './Navbar.jsx'
import { ChevronRight, Home, ShieldCheck } from 'lucide-react'

export default function Layout({
  children,
  currentPath = '/beranda',
  onLogout,
  breadcrumbs = [],
  title,
  subtitle,
  eyebrow,
  actions,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] font-sans antialiased text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-white">
      {/* Top Main Navigation */}
      <Navbar currentPath={currentPath} onLogout={onLogout} />

      {/* Main Page Content Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] mb-5 overflow-x-auto whitespace-nowrap py-1">
            <a href="/beranda" className="hover:text-[var(--color-primary)] flex items-center gap-1 transition">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </a>
            {breadcrumbs
              .filter((crumb) => !crumb.label || crumb.label.toLowerCase() !== 'beranda')
              .map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  {crumb.path ? (
                    <a href={crumb.path} className="hover:text-[var(--color-primary)] font-medium transition">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="font-semibold text-slate-800">{crumb.label}</span>
                  )}
                </div>
              ))}
          </nav>
        )}

        {/* Page Header (Title, Subtitle, Action Buttons) */}
        {(title || subtitle || eyebrow) && (
          <header className="mb-6 pb-6 border-b border-[rgba(31,78,120,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              {eyebrow && (
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  <span className="text-xs uppercase font-bold tracking-wider text-[var(--color-primary)]">
                    {eyebrow}
                  </span>
                </div>
              )}
              {title && (
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-3xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && <div className="shrink-0 flex items-center gap-2.5">{actions}</div>}
          </header>
        )}

        {/* Dynamic Page Views */}
        <div>{children}</div>
      </main>

      {/* Official Government App Footer */}
      <footer className="mt-auto border-t border-[rgba(31,78,120,0.1)] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted)]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[rgba(0,90,156,0.08)] flex items-center justify-center text-[var(--color-primary)]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-bold text-[var(--color-text)]">
                SILAT · Kementerian Kelautan dan Perikanan Republik Indonesia
              </p>
              <p className="text-[11px] text-slate-400">
                Direktorat Jenderal Perikanan Tangkap &copy; 2026. Hak Cipta Dilindungi.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="/beranda" className="hover:text-[var(--color-primary)] transition">Panduan Sistem</a>
            <span>•</span>
            <a href="/beranda" className="hover:text-[var(--color-primary)] transition">Bantuan Teknis (Helpdesk)</a>
            <span>•</span>
            <span className="font-mono text-slate-400">v2.4.0-release</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
