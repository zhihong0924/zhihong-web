"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  { src: "/images/invention-disclosures/invention-award-plaque.jpg", alt: "Keysight Intellectual Property Award plaque for Zhi-Hong Chong's commercialized battery characterization invention", label: "2020 · INVENTION", caption: "Commercialized battery-characterization invention", width: 3120, height: 4160 },
  { src: "/images/invention-disclosures/invention-commercialization-letter.png", alt: "Keysight letter recognizing the commercialization of an invention by Zhi Hong Chong", label: "2021 · COMMERCIALIZATION", caption: "Commercialization recognition letter", width: 1101, height: 1429 },
];

export default function InventionDisclosureGallery() {
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
      <div className="cadence-gallery invention-gallery" aria-label="Keysight invention disclosure gallery">
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
