import ThemeToggle from '@/components/ThemeToggle';
import CopyButton from '@/components/CopyButton';

const INSTALL_CMD = 'curl -fsSL https://buoy.gabemempin.me/install.sh | sh';

const features = [
  { title: 'Always on top', desc: 'Floats above every window so you never lose your place.' },
  { title: 'Global hotkey', desc: 'Toggle it instantly from anywhere on your Mac.' },
  { title: 'Auto-saved', desc: 'Notes are saved the moment you type them.' },
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen min-w-[320px] flex flex-col items-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-500">
      <ThemeToggle />

      {/* Hero image — crossfades between light and dark */}
      <div className="flex w-full justify-center overflow-hidden">
        <div className="relative aspect-[2880/340] w-full min-w-[1200px] flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Beta1/beta1-hero-light.png"
            alt="Buoy app preview"
            className="absolute inset-0 h-full w-full object-cover object-[48%_center] transition-opacity duration-500 dark:opacity-0"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Beta1/beta1-hero-dark.png"
            alt="Buoy app preview"
            className="absolute inset-0 h-full w-full object-cover object-[48%_center] opacity-0 transition-opacity duration-500 dark:opacity-100"
          />
        </div>
      </div>

      {/* Hero content */}
      <section className="flex flex-col items-center text-center gap-3 max-w-xl px-6 pt-14 pb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt="Buoy icon" width={80} height={80} className="animate-fade-in" style={{ animationDelay: '0ms' }} />
        <h1
          className="text-4xl font-bold tracking-tight animate-fade-in"
          style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif', fontStretch: 'ultra-expanded', color: '#FCC527', animationDelay: '100ms' }}
        >
          Download Buoy
        </h1>
        <h2 className="text-xl font-semibold tracking-tight animate-fade-in" style={{ animationDelay: '250ms', color: '#4BA6C1' }}>
          Beta 1 — macOS 15.0+
        </h2>

        {/* Beta disclaimer */}
        <p
          className="mt-1 px-4 py-2 rounded-full text-sm font-medium animate-fade-in"
          style={{ animationDelay: '350ms', background: '#4BA6C122', color: '#4BA6C1', border: '1px solid #4BA6C166' }}
        >
          This is an early beta. Expect rough edges.
        </p>
      </section>

      {/* Install command */}
      <section className="w-full max-w-2xl px-6 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <div className="w-full flex items-stretch gap-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3">
          <code className="flex-1 text-sm text-gray-800 dark:text-gray-100 font-mono truncate self-center">
            {INSTALL_CMD}
          </code>
          <div className="flex items-center">
            <CopyButton text={INSTALL_CMD} />
          </div>
        </div>
        <p className="text-gray-500 text-sm">Open Terminal on your Mac and paste this to install.</p>
      </section>

      {/* Features */}
      <section className="mt-14 mb-10 grid sm:grid-cols-3 gap-8 max-w-2xl text-center px-6">
        {features.map((f) => (
          <div key={f.title}>
            <h3 className="font-semibold mb-1" style={{ color: '#4BA6C1' }}>{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Screenshots */}
      <section className="mb-14 flex flex-col sm:flex-row gap-6 max-w-3xl w-full px-6">
        <div className="flex flex-col items-center gap-2 w-full sm:w-1/2">
          <div className="w-full overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Beta1/beta1-notes.png"
              alt="Buoy notes view"
              className="w-full -my-[6px]"
            />
          </div>
          <h2 className="text-sm font-semibold text-center" style={{ color: '#4BA6C1' }}>Use Buoy as you normally would a notes app!</h2>
        </div>
        <div className="flex flex-col items-center gap-2 w-full sm:w-1/2">
          <div className="w-full overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Beta1/beta1-settings.png"
              alt="Buoy settings view"
              className="w-full -my-[6px]"
            />
          </div>
          <h2 className="text-sm font-normal text-center" style={{ color: '#4BA6C1' }}><strong>See something you don&apos;t like?</strong><br/>Click the Report a Bug button under Settings.</h2>
        </div>
      </section>

      {/* Closing line */}
      <section className="mb-14 text-center px-6">
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif', fontStretch: 'ultra-expanded', color: '#FCC527' }}
        >
          Enjoy floating with Buoy!
        </h1>
      </section>

      {/* Footer */}
      <footer className="mb-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} Gabe Mempin
      </footer>
    </main>
  );
}
