import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Download, ShieldCheck } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { EXCLUSIVE_PLUGINS, type ExclusivePlugin } from '../data/exclusivePlugins';
import { DownloadNoticeDialog, type PendingDownload } from '../components/DownloadNoticeDialog';

interface ExclusivePluginPageProps {
  plugin: ExclusivePlugin;
}

export function ExclusivePluginPage({ plugin }: ExclusivePluginPageProps) {
  const [user, setUser] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);

  useEffect(() => {
    document.title = plugin.seoTitle;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [plugin.seoTitle, plugin.id]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDownload = async () => {
    if (!user) {
      try {
        try {
          sessionStorage.setItem('devee_return_to', window.location.pathname);
        } catch {}
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin,
            queryParams: {
              access_type: 'offline',
              prompt: 'select_account',
            },
          },
        });
        if (error) throw error;
      } catch (error) {
        console.error('Authentication error:', error);
      }
      return;
    }

    setPendingDownload({
      name: plugin.name,
      fileName: plugin.storageFile,
      windowsFileName: plugin.windowsStorageFile,
      bucket: plugin.bucket,
      img: plugin.img,
      formats: plugin.formats,
    });
  };

  const handleConfirmDownload = async (
    item: PendingDownload,
    resolvedFileName: string
  ) => {
    setIsDownloading(true);
    try {
      const { data, error } = await supabase.storage
        .from(item.bucket)
        .createSignedUrl(resolvedFileName, 60);

      if (error) throw error;

      if (data?.signedUrl) {
        const a = document.createElement('a');
        a.href = data.signedUrl;
        a.download = resolvedFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading plugin:', error);
      alert(
        `There was an issue downloading "${resolvedFileName}". Please make sure the file is uploaded in the "${item.bucket}" bucket or try again shortly.`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080707] text-white selection:bg-orange-500 selection:text-black overflow-x-clip">
      {/* Subtle Top Studio Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[130px] opacity-35"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(249,115,22,0.38) 0%, rgba(220,38,38,0.14) 48%, transparent 75%)',
        }}
      />

      {/* Top Navigation */}
      <header className="relative z-20 border-b border-white/8 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-white/75 hover:text-white transition-colors"
            aria-label="Back to deVee Music"
          >
            <ArrowLeft className="w-4 h-4 text-orange-400" />
            <img
              src="/deVee-logo.webp"
              alt="deVee Music"
              width={64}
              height={24}
              className="h-5 w-auto object-contain opacity-90"
            />
          </a>

          <nav aria-label="deVee Exclusive Plugins" className="flex items-center gap-1.5 sm:gap-2">
            {EXCLUSIVE_PLUGINS.map((item) => {
              const isCurrent = item.id === plugin.id;
              return (
                <a
                  key={item.id}
                  href={`/plugins/${item.slug}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                    isCurrent
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/45'
                      : 'text-white/50 hover:text-white bg-white/[0.03] border border-white/10'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-5 pt-12 sm:pt-16 pb-24">
        {/* Hero Header */}
        <section className="text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/12 border border-orange-500/30 text-orange-300 text-[11px] font-bold uppercase tracking-[0.22em] mb-5">
            <span>deVee Exclusive</span>
            <span className="text-white/30">·</span>
            <span>{plugin.version}</span>
            <span className="text-white/30">·</span>
            <span>{plugin.formats}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3">
            {plugin.brandName}
          </h1>
          <p className="text-xl sm:text-2xl font-light text-orange-400/95 tracking-wide mb-5">
            {plugin.tagline}
          </p>
          <p className="text-white/65 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
            {plugin.pageLead}
          </p>

          {/* Primary Download CTA */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownload}
              className={`group inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r ${plugin.accentFrom} ${plugin.accentTo} hover:brightness-110 disabled:opacity-60 rounded-full shadow-[0_0_34px_rgba(249,115,22,0.42)] hover:shadow-[0_0_46px_rgba(249,115,22,0.62)] transition-all duration-300`}
            >
              <Download className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span className="font-bold uppercase tracking-[0.18em] text-xs sm:text-sm text-white">
                {isDownloading
                  ? 'Preparing Download...'
                  : user
                    ? `${plugin.downloadLabel} (${plugin.version})`
                    : `Sign In With Google To ${plugin.downloadLabel}`}
              </span>
            </button>
            <p className="inline-flex items-center gap-1.5 text-white/40 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400/80" />
              <span>Free for deVee members · {plugin.platform}</span>
            </p>
          </div>

          {/* Hero Plugin Screenshot (LCP Image with fetchpriority="high") */}
          <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/12 bg-[#0d0d0f] shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-orange-500/8 via-transparent to-white/5 z-10"
            />
            <img
              src={plugin.img}
              alt={`${plugin.brandName} — ${plugin.subtitle}`}
              width={plugin.imgWidth}
              height={plugin.imgHeight}
              {...({ fetchpriority: 'high' } as any)}
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
        </section>

        {/* Architecture & Features Grid */}
        <section className="mt-20" aria-labelledby="features-heading">
          <div className="mb-8 text-center sm:text-left">
            <p className="text-orange-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-2">
              Inside {plugin.name}
            </p>
            <h2 id="features-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Engineered for modern mixes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {plugin.highlights.map((feat) => (
              <div
                key={feat.label}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-7 hover:border-orange-500/35 transition-colors"
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400 mb-2">
                  {feat.label}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specs & Installation */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Technical Specs */}
          <div className="rounded-2xl bg-white/[0.025] border border-white/10 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold uppercase tracking-[0.14em] text-white mb-5">
              Specifications
            </h2>
            <dl className="divide-y divide-white/8">
              {plugin.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45 shrink-0">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-white/85 sm:text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Quick Install Steps */}
          <div className="rounded-2xl bg-white/[0.025] border border-white/10 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold uppercase tracking-[0.14em] text-white mb-5">
              Quick Installation
            </h2>
            <ol className="space-y-4">
              {plugin.installSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-500/15 border border-orange-500/35 text-orange-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ Accordion (Native <details>, non-exclusive, accessible) */}
        <section className="mt-16 plugin-faq-accordion" aria-labelledby="plugin-faq-heading">
          <h2 id="plugin-faq-heading" className="text-2xl font-black tracking-tight text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {plugin.faqs.map((faq) => (
              <details
                key={faq.question}
                className="plugin-faq-item rounded-2xl bg-white/[0.025] border border-white/10 open:border-orange-500/35 transition-colors"
              >
                <summary className="plugin-faq-summary px-5 sm:px-6 py-4 text-sm sm:text-base font-semibold text-white/90 hover:text-white cursor-pointer select-none">
                  {faq.question}
                </summary>
                <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-white/60 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-orange-500/12 via-white/[0.03] to-transparent border border-orange-500/25 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-orange-300 text-xs font-bold uppercase tracking-[0.18em] mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ready to drop into your DAW</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Get {plugin.brandName} now
            </h2>
            <p className="text-sm text-white/55 mt-1">
              {plugin.formats} · {plugin.platform}
            </p>
          </div>
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownload}
            className={`shrink-0 inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r ${plugin.accentFrom} ${plugin.accentTo} hover:brightness-110 disabled:opacity-60 rounded-full font-bold uppercase tracking-[0.18em] text-xs text-white shadow-[0_0_28px_rgba(249,115,22,0.4)] transition-all`}
          >
            <Download className="w-4 h-4" />
            <span>
              {isDownloading
                ? 'Preparing...'
                : user
                  ? plugin.downloadLabel
                  : 'Sign In To Download'}
            </span>
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/8 py-8 text-center text-xs text-white/35">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Created by David &ldquo;deVee&rdquo; Ben David</span>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-white/75 transition-colors">
              deVee Music Home
            </a>
            <a href="/privacy.html" className="hover:text-white/75 transition-colors">
              Privacy
            </a>
            <a href="/terms.html" className="hover:text-white/75 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>

      <DownloadNoticeDialog
        pending={pendingDownload}
        isDownloading={isDownloading}
        onConfirm={handleConfirmDownload}
        onClose={() => setPendingDownload(null)}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .plugin-faq-summary {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .plugin-faq-summary::-webkit-details-marker {
          display: none;
        }
        .plugin-faq-summary::before {
          content: "";
          inline-size: 0.85em;
          block-size: 0.85em;
          flex-shrink: 0;
          background-color: #fb923c;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat center / contain;
          -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat center / contain;
          rotate: -90deg;
        }
        details.plugin-faq-item[open] > .plugin-faq-summary::before {
          rotate: 0deg;
        }
        details.plugin-faq-item::details-content {
          interpolate-size: allow-keywords;
          overflow: clip;
          contain: layout;
        }
        details.plugin-faq-item:not([open])::details-content {
          block-size: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .plugin-faq-summary::before {
            transition: rotate 0.2s ease;
          }
          details.plugin-faq-item::details-content {
            transition: block-size, content-visibility, display;
            transition-duration: 0.26s;
            transition-timing-function: ease-in-out;
            transition-behavior: allow-discrete;
          }
        }
      `}} />
    </div>
  );
}
