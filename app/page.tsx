import WaitlistForm from '@/components/WaitlistForm';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen min-w-[320px] flex flex-col items-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-500">
      <ThemeToggle />

      {/* Hero image — crossfades between light and dark */}
      <div className="flex w-full justify-center overflow-hidden">
        <div className="relative aspect-[2880/340] w-full min-w-[1200px] flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-light.png"
            alt="Buoy app preview"
            className="absolute inset-0 h-full w-full object-cover object-[48%_center] transition-opacity duration-500 dark:opacity-0"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-dark.png"
            alt="Buoy app preview"
            className="absolute inset-0 h-full w-full object-cover object-[48%_center] opacity-0 transition-opacity duration-500 dark:opacity-100"
          />
        </div>
      </div>

      {/* Hero content */}
      <section className="flex flex-col items-center text-center gap-2 max-w-xl px-6 py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt="Buoy icon" width={80} height={80} className="animate-fade-in" style={{ animationDelay: '0ms' }} />
        <h1 className="text-4xl font-bold tracking-tight animate-fade-in" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif', fontStretch: 'ultra-expanded', color: '#FCC527', animationDelay: '100ms' }}>Meet Buoy</h1>
        <h2 className="text-2xl font-semibold tracking-tight max-w-2xl animate-fade-in" style={{ animationDelay: '250ms', color: '#4BA6C1' }}>A lightweight, always-on-top <br/>floating notepad for macOS.</h2>
        <p className="text-lg text-gray-500 tracking-[-0.02em] animate-fade-in" style={{ animationDelay: '400ms' }}>
          Lives in your menu bar and stays above every window so you never lose your notes.
        </p>
        <div className="mt-10 animate-fade-in" style={{ animationDelay: '550ms' }}><WaitlistForm /></div>
      </section>

      {/* Features */}
      <section className="mt-2 mb-16 grid sm:grid-cols-3 gap-8 max-w-2xl text-center px-6">
        {[
          { title: 'Always on top', desc: 'Floats above every window so you never lose your place.' },
          { title: 'Global hotkey', desc: 'Toggle it instantly from anywhere on your Mac.' },
          { title: 'Auto-saved', desc: 'Notes are saved the moment you type them.' },
        ].map((f) => (
          <div key={f.title}>
            <h2 className="font-semibold mb-1" style={{ color: '#4BA6C1' }}>{f.title}</h2>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mb-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} Gabe Mempin
      </footer>
    </main>
  );
}
