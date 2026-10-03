"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

/* Masonry via CSS columns: the pieces are a mix of 4:3, 2:3 and 9:16, so a
   fixed grid would either crop them or leave big gaps. */
export default function DesignGallery({ items, locale = "en", labels = {} }) {
  const [open, setOpen] = useState(null);

  const text = {
    view: "View full size",
    close: "Close",
    ...labels,
  };

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(item)}
            aria-label={`${text.view} — ${item.title[locale]}`}
            className="group block w-full break-inside-avoid overflow-hidden rounded-[18px] border border-border bg-card text-start shadow-[0_10px_30px_oklch(var(--shadow)_/_0.08)] transition-shadow hover:shadow-[0_18px_44px_oklch(var(--shadow)_/_0.16)]"
          >
            <div className="relative overflow-hidden bg-muted">
              <Image
                src={item.src}
                alt={item.title[locale]}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 340px"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <div className="text-[12.5px] font-semibold text-primary">
                {item.tag[locale]}
              </div>
              <h3 className="mt-1 font-serif text-[19px] font-semibold leading-tight">
                {item.title[locale]}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {item.caption[locale]}
              </p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <Lightbox
          item={open}
          locale={locale}
          closeLabel={text.close}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

export function Lightbox({ item, locale, closeLabel, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title[locale]}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute end-4 top-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-ink-foreground/15 text-ink-foreground transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <X className="h-5 w-5" />
      </button>
      <Image
        src={item.src}
        alt={item.title[locale]}
        width={item.width}
        height={item.height}
        sizes="(max-width: 640px) 92vw, 70vh"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[86svh] w-auto rounded-[var(--radius-lg)] shadow-2xl"
      />
    </div>,
    document.body,
  );
}
