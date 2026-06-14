"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { label: "artwork placeholder 1" },
  { label: "artwork placeholder 2" },
  { label: "artwork placeholder 3" },
  { label: "artwork placeholder 4" },
];

export function ArtCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(goToNext, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="art-carousel" aria-label="Artwork carousel">
      <button
        className="carousel-arrow"
        type="button"
        onClick={goToPrevious}
        aria-label="Previous artwork"
      >
        &lt;
      </button>

      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="carousel-slide" key={slide.label}>
              <div className="soft-photo carousel-photo">
                <span>{slide.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-arrow"
        type="button"
        onClick={goToNext}
        aria-label="Next artwork"
      >
        &gt;
      </button>

      <Link className="carousel-portfolio-link" href="/portfolio">
        View portfolio
      </Link>
    </div>
  );
}
