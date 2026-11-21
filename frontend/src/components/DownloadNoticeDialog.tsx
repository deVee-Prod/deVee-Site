import React, { useEffect, useId, useRef } from 'react';
import { Download, ShieldCheck, X } from 'lucide-react';

export interface PendingDownload {
  name: string;
  fileName: string;
  bucket: string;
}

interface DownloadNoticeDialogProps {
  pending: PendingDownload | null;
  isDownloading: boolean;
  onConfirm: (item: PendingDownload) => Promise<void> | void;
  onClose: () => void;
}

export function DownloadNoticeDialog({
  pending,
  isDownloading,
  onConfirm,
  onClose,
}: DownloadNoticeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pending) {
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

  const handleConfirmClick = async () => {
    if (!pending || isDownloading) return;
    await onConfirm(pending);
    dialogRef.current?.close();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as any)}
        aria-labelledby={titleId}
        className="devee-download-dialog bg-transparent p-0 m-auto max-w-[440px] w-[calc(100%-2rem)] overflow-visible text-white"
      >
        {pending && (
          <div className="relative rounded-3xl bg-[#0e0c0b] border border-white/12 p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-left">
            <form method="dialog">
              <button
                type="submit"
                aria-label="Close download notice"
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/12 border border-orange-500/30 text-orange-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free &amp; Safe</span>
            </div>

            <h3
              id={titleId}
              className="text-xl sm:text-2xl font-black tracking-tight text-white mb-3 pr-6"
            >
              Before you download {pending.name}
            </h3>

            <p className="text-sm text-white/70 leading-relaxed mb-4">
              All deVee plugins are <strong className="text-white">completely free</strong>. To keep them free without paying annual Apple/Windows code-signing fees, the installers aren&apos;t notarized — so your browser or OS may show a standard warning. There is nothing to worry about.
            </p>

            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2.5 text-xs sm:text-[13px] text-white/65 leading-relaxed mb-6">
              <p>
                <strong className="text-orange-300">Chrome / Browser:</strong>{' '}
                If you see a &ldquo;suspicious&rdquo; or &ldquo;unverified&rdquo; download alert, simply click <strong className="text-white">Keep</strong> (or <strong className="text-white">Download anyway</strong>).
              </p>
              <p>
                <strong className="text-orange-300">macOS:</strong>{' '}
                If blocked on first open, go to <strong className="text-white">System Settings → Privacy &amp; Security → Open Anyway</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                autoFocus
                disabled={isDownloading}
                onClick={handleConfirmClick}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:brightness-110 disabled:opacity-60 font-bold uppercase tracking-[0.16em] text-xs text-white shadow-[0_0_26px_rgba(249,115,22,0.4)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloading ? 'Preparing...' : `Download ${pending.name}`}
                </span>
              </button>

              <form method="dialog" className="sm:w-auto">
                <button
                  type="submit"
                  className="w-full px-5 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-[0.16em] text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </dialog>

      <style dangerouslySetInnerHTML={{ __html: `
        dialog.devee-download-dialog:modal {
          overscroll-behavior: contain;
        }
        dialog.devee-download-dialog::backdrop {
          background: rgba(0, 0, 0, 0.76);
          backdrop-filter: blur(10px);
          overflow: hidden;
          overscroll-behavior: contain;
        }
      `}} />
    </>
  );
}
