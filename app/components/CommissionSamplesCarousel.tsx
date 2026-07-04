"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export function CommissionSamplesCarousel({
  title,
  samples,
  destinationHref,
}: {
  title: string;
  samples: string[];
  destinationHref?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const previousIndex =
    (activeIndex - 1 + samples.length) % samples.length;
  const nextIndex = (activeIndex + 1) % samples.length;

  const previous = () => {
    setActiveIndex((current) => (current - 1 + samples.length) % samples.length);
  };

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % samples.length);
  }, [samples.length]);

  useEffect(() => {
    if (modalOpen || samples.length < 2) return;
    const timer = window.setInterval(next, 4200);
    return () => window.clearInterval(timer);
  }, [modalOpen, next, samples.length]);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen]);

  return (
    <>
      <div className="type-sample-carousel">
        <button
          className="sample-arrow"
          type="button"
          onClick={previous}
          aria-label="Previous sample"
        >
          &lt;
        </button>
        <div className="type-sample-stage">
          <button
            className="type-sample-card previous"
            key={`previous-${samples[previousIndex]}`}
            type="button"
            onClick={previous}
            aria-label={`Show ${samples[previousIndex]}`}
          >
            {samples[previousIndex]}
          </button>
          {destinationHref ? (
            <Link
              className="type-sample-card current"
              key={`current-${samples[activeIndex]}`}
              href={destinationHref}
              aria-label={`View ${title}`}
            >
              <span>{samples[activeIndex]}</span>
              <small>View portfolio</small>
            </Link>
          ) : (
            <button
              className="type-sample-card current"
              key={`current-${samples[activeIndex]}`}
              type="button"
              onClick={() => setModalOpen(true)}
              aria-label={`Open ${title} sample gallery`}
            >
              <span>{samples[activeIndex]}</span>
              <small>Click to view samples</small>
            </button>
          )}
          <button
            className="type-sample-card next"
            key={`next-${samples[nextIndex]}`}
            type="button"
            onClick={next}
            aria-label={`Show ${samples[nextIndex]}`}
          >
            {samples[nextIndex]}
          </button>
        </div>
        <button
          className="sample-arrow"
          type="button"
          onClick={next}
          aria-label="Next sample"
        >
          &gt;
        </button>
      </div>

      {modalOpen && !destinationHref && (
        <div className="samples-modal-backdrop" role="presentation">
          <div
            className="samples-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="samples-modal-title"
          >
            <div className="samples-modal-heading">
              <h2 id="samples-modal-title">{title} samples</h2>
              <button
                className="sample-modal-close"
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close samples"
              >
                ×
              </button>
            </div>

            <div className="samples-modal-stage">
              <button
                className="sample-arrow"
                type="button"
                onClick={previous}
                aria-label="Previous sample"
              >
                ◀
              </button>
              <div className="sample-modal-image">{samples[activeIndex]}</div>
              <button
                className="sample-arrow"
                type="button"
                onClick={next}
                aria-label="Next sample"
              >
                ▶
              </button>
            </div>

            <div className="sample-reel" aria-label="Choose a sample">
              {samples.map((sample, index) => (
                <button
                  className={`sample-thumbnail ${
                    index === activeIndex ? "selected" : ""
                  }`}
                  type="button"
                  key={sample}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={index === activeIndex}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
