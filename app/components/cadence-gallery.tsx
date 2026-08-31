"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  { src: "/images/cadence-connect/2024-speaking.jpeg", alt: "Zhihong presenting Virtuoso Analog Schematic Migration at CadenceConnect Malaysia 2024", label: "CADENCECONNECT MALAYSIA", caption: "Speaking on Virtuoso Analog Schematic Migration · 2024", width: 961, height: 474 },
  { src: "/images/cadence-connect/2024-certificate.jpeg", alt: "CadenceConnect Malaysia 2024 certificate of appreciation", label: "2024", caption: "Certificate of appreciation", width: 2048, height: 1536 },
  { src: "/images/cadence-connect/2025-certificate.jpg", alt: "CadenceConnect Malaysia 2025 certificate of appreciation", label: "2025", caption: "Certificate of appreciation", width: 4096, height: 3072 },
  { src: "/images/cadence-connect/2026-certificate.jpeg", alt: "CadenceConnect Malaysia 2026 certificate of appreciation", label: "2026", caption: "Certificate of appreciation", width: 768, height: 1024 },
];

export default function CadenceGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : images[selectedIndex];

  useEffect(() => {
    if (!selected) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return (
    <>
      <div className="cadence-gallery" aria-label="CadenceConnect speaker gallery">
        {images.map((image, index) => (
          <figure key={image.src}>
            <button type="button" onClick={() => setSelectedIndex(index)} aria-label={`View ${image.caption} at full size`}>
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 44vw, 12rem" />
              <figcaption><span>{image.label}</span><strong>{image.caption}</strong></figcaption>
            </button>
          </figure>
        ))}
      </div>

      {selected && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={selected.caption} onClick={() => setSelectedIndex(null)}>
          <div className="image-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="image-lightbox-close" type="button" autoFocus onClick={() => setSelectedIndex(null)} aria-label="Close full-size image">×</button>
            <Image className="image-lightbox-image" src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} unoptimized sizes="92vw" />
            <p>{selected.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
