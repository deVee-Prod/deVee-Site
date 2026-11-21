import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowDownToLine, X } from 'lucide-react';

export interface PendingDownload {
  name: string;
  fileName: string;
  windowsFileName?: string;
  bucket: string;
  img?: string;
  formats?: string;
}

interface DownloadNoticeDialogProps {
  pending: PendingDownload | null;
  isDownloading: boolean;
  onConfirm: (item: PendingDownload, resolvedFileName: string) => Promise<void> | void;
  onClose: () => void;
}

function detectInitialPlatform(): 'macos' | 'windows' {
  if (typeof navigator !== 'undefined' && /Windows/i.test(navigator.userAgent)) {
    return 'windows';
  }
  return 'macos';
}

export function DownloadNoticeDialog({
  pending,
  isDownloading,
  onConfirm,
  onClose,
}: DownloadNoticeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [selectedPlatform, setSelectedPlatform] = useState<'macos' | 'windows'>(
    detectInitialPlatform
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pending) {
      setSelectedPlatform(
        pending.windowsFileName ? detectInitialPlatform() : 'macos'
      );
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [pending]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };
    dialog.addEventListener('close', handleClose);

    // Light-dismiss fallback for browsers without native dialog closedby="any" (e.g. Safari)
    let pressedOutside = false;
    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        pressedOutside = isOutside(e);
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (
        !('closedBy' in HTMLDialogElement.prototype) &&
        pressedOutside &&
        isOutside(e)
      ) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, [onClose]);

  const hasPlatformChoice = Boolean(pending?.windowsFileName);
  const activeFileName = pending
    ? hasPlatformChoice && selectedPlatform === 'windows' && pending.windowsFileName
      ? pending.windowsFileName
      : pending.fileName
    : '';

  const handleConfirmClick = async () => {
    if (!pending || isDownloading || !activeFileName) return;
    await onConfirm(pending, activeFileName);
    dialogRef.current?.close();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as any)}
        aria-labelledby={titleId}
        className="devee-download-dialog bg-transparent p-0 m-auto max-w-[460px] w-[calc(100%-2rem)] overflow-visible text-white"
      >
        {pending && (
          <div
            className="relative rounded-2xl overflow-hidden text-left border border-white/[0.11] shadow-[0_40px_110px_rgba(0,0,0,0.92)]"
            style={{
              background:
                'linear-gradient(180deg, #15161a 0%, #0d0e11 45%, #09090b 100%)',
            }}
          >
            {/* Subtle top aluminum bevel highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-30"
            />

            {/* Top Hardware Header Bar */}
            <div className="relative z-20 flex items-center justify-between px-6 h-12 border-b border-white/[0.07] bg-black/35">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
                  deVee Exclusive · Release Notice
                </span>
              </div>
              <form method="dialog">
                <button
                  type="submit"
                  aria-label="Close download notice"
                  className="text-white/35 hover:text-white transition-colors p-1 -mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Subtle Plugin Visual Strip */}
            {pending.img && (
              <div className="relative h-28 overflow-hidden border-b border-white/[0.06] bg-[#0b0b0d]">
                <img
                  src={pending.img}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center opacity-55 scale-[1.03] saturate-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-[#0d0e11]/45 to-black/35"
                />
                <div className="absolute bottom-3.5 inset-x-6 flex items-end justify-between gap-4">
                  <h3
                    id={titleId}
                    className="text-2xl font-black tracking-tight text-white leading-none drop-shadow-md"
                  >
                    {pending.name}
                  </h3>
                  {pending.formats && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-400/90">
                      {hasPlatformChoice && selectedPlatform === 'windows'
                        ? 'VST3 · Standalone'
                        : pending.formats}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="px-6 pt-5 pb-6">
              {!pending.img && (
                <h3
                  id={titleId}
                  className="text-2xl font-black tracking-tight text-white mb-3"
                >
                  {pending.name}
                </h3>
              )}

              {/* Hardware OS Selector (macOS / Windows) when both builds exist */}
              {hasPlatformChoice && (
                <div
                  role="radiogroup"
                  aria-label="Choose operating system"
                  className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/50 border border-white/[0.08] mb-4"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selectedPlatform === 'macos'}
                    onClick={() => setSelectedPlatform('macos')}
                    className={`py-2 px-3 rounded-lg font-mono text-[11px] uppercase tracking-[0.16em] transition-all ${
                      selectedPlatform === 'macos'
                        ? 'bg-white/[0.11] text-white border border-orange-500/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                        : 'text-white/45 hover:text-white/80 border border-transparent'
                    }`}
                  >
                    macOS
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selectedPlatform === 'windows'}
                    onClick={() => setSelectedPlatform('windows')}
                    className={`py-2 px-3 rounded-lg font-mono text-[11px] uppercase tracking-[0.16em] transition-all ${
                      selectedPlatform === 'windows'
                        ? 'bg-white/[0.11] text-white border border-orange-500/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                        : 'text-white/45 hover:text-white/80 border border-transparent'
                    }`}
                  >
                    Windows
                  </button>
                </div>
              )}

              <p className="text-[13.5px] text-white/65 leading-relaxed mb-5">
                All deVee plugins are{' '}
                <span className="text-white font-medium">completely free</span>. To keep them free without annual Apple or Windows code-signing fees, these builds aren&apos;t notarized — so you&apos;ll see standard unsigned-file prompts. Safe to install.
              </p>

              {/* Hairline Hardware Spec Rows */}
              <div className="border-t border-b border-white/[0.07] divide-y divide-white/[0.06] mb-6">
                <div className="py-3 flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-orange-400/90 shrink-0 w-16">
                    01 · WEB
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed">
                    If Chrome flags the archive, click{' '}
                    <span className="text-white font-medium">Keep</span> or{' '}
                    <span className="text-white font-medium">Download anyway</span>.
                  </p>
                </div>
                <div className="py-3 flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-orange-400/90 shrink-0 w-16">
                    02 · OS
                  </span>
                  {hasPlatformChoice && selectedPlatform === 'windows' ? (
                    <p className="text-xs text-white/60 leading-relaxed">
                      On Windows SmartScreen click{' '}
                      <span className="text-white font-medium">More info → Run anyway</span>, and copy the <code className="text-white/85">.vst3</code> into{' '}
                      <code className="text-white/85">C:\Program Files\Common Files\VST3</code>.
                    </p>
                  ) : (
                    <p className="text-xs text-white/60 leading-relaxed">
                      On macOS first launch: open{' '}
                      <span className="text-white font-medium">
                        System Settings → Privacy &amp; Security → Open Anyway
                      </span>
                      .
                    </p>
                  )}
                </div>
              </div>

              {/* Hardware ENGAGE-style CTA */}
              <button
                type="button"
                autoFocus
                disabled={isDownloading}
                onClick={handleConfirmClick}
                className="w-full h-12 rounded-xl flex items-center justify-center gap-2.5 font-bold tracking-[0.08em] text-[12.5px] text-white transition-all duration-200 disabled:opacity-55 cursor-pointer hover:brightness-110 active:scale-[0.99]"
                style={{
                  background:
                    'linear-gradient(180deg, #ea580c 0%, #c2410c 100%)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.26), 0 10px 28px -8px rgba(234,88,12,0.55)',
                  border: '1px solid rgba(251,146,60,0.45)',
                }}
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>
                  {isDownloading
                    ? 'Preparing Download...'
                    : hasPlatformChoice
                      ? `Download ${pending.name} (${selectedPlatform === 'windows' ? 'Windows' : 'macOS'})`
                      : `Download ${pending.name}`}
                </span>
              </button>
            </div>

            {/* Bottom Hardware Telemetry Strip */}
            <div className="px-6 h-10 border-t border-white/[0.06] bg-black/45 flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.14em] text-white/35">
              <span className="truncate">{activeFileName}</span>
              <span className="shrink-0 uppercase text-white/40">Free · Unsigned</span>
            </div>
          </div>
        )}
      </dialog>

      <style dangerouslySetInnerHTML={{ __html: `
        dialog.devee-download-dialog:modal {
          overscroll-behavior: contain;
        }
        dialog.devee-download-dialog::backdrop {
          background: rgba(4, 4, 6, 0.8);
          backdrop-filter: blur(12px);
          overflow: hidden;
          overscroll-behavior: contain;
        }
      `}} />
    </>
  );
}
