import React from 'react';

const TrustedBySection = () => {
  const logos = [
    { name: 'Clay', url: 'https://clay.earth' },
    { name: 'ContactOut', url: 'https://contactout.com' },
    { name: 'Skrapp', url: 'https://skrapp.io' },
    { name: 'MillionVerifier', url: 'https://millionverifier.com' },
    { name: 'ZeroBounce', url: 'https://zerobounce.net' },
    { name: 'Apollo', url: 'https://apollo.io' },
    { name: 'ZoomInfo', url: 'https://zoominfo.com' },
    { name: 'Clearout', url: 'https://clearout.io' },
  ];

  const brandGradients: Record<string, string> = {
    Clay: 'from-emerald-400 to-teal-300',
    ContactOut: 'from-sky-400 to-cyan-300',
    Skrapp: 'from-fuchsia-400 to-violet-400',
    MillionVerifier: 'from-amber-300 to-orange-400',
    ZeroBounce: 'from-rose-400 to-red-400',
    Apollo: 'from-indigo-400 to-blue-400',
    ZoomInfo: 'from-lime-300 to-emerald-400',
    Clearout: 'from-purple-400 to-pink-400',
  };

  const loopLogos = logos.concat(logos);

  return (
    <section className="mt-6 relative px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center uppercase tracking-wide text-white/70 text-sm mb-4">
          Trusted by
        </h3>
        
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
          />
          <div className="group">
            <div
              className="flex gap-8 items-center marquee"
              style={{ width: `${logos.length * 160 * 2}px` }}
            >
              {loopLogos.map((logo, index) => {
                const gradient = brandGradients[logo.name] ?? 'from-white to-white';
                return (
                  <a
                    key={`${logo.name}-${index}`}
                    href={logo.url}
                    aria-label={`${logo.name} website`}
                    className={`inline-flex items-center justify-center px-6 py-2 rounded-lg whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r ${gradient} opacity-100 hover:opacity-100 hover:scale-[1.04] transition-transform duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-white/70`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-base font-semibold tracking-tight">
                      {logo.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
