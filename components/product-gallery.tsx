"use client";

import Image from "next/image";
import { useState } from "react";
import type { MerchProduct } from "@/types/site";
import { ButtonLink } from "./button-link";

type ProductGalleryProps = {
  product: MerchProduct;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [selectedImageId, setSelectedImageId] = useState(product.images[0]?.id ?? "");

  const visibleImages = product.images.filter(
    (image) => image.color === selectedColor,
  );
  const activeImage =
    visibleImages.find((image) => image.id === selectedImageId) ?? visibleImages[0];

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="relative aspect-4/5 overflow-hidden rounded-4xl border border-ink/8 bg-white shadow-[0_28px_60px_rgba(17,22,20,0.08)]">
          {activeImage ? (
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1280px) 42vw, 100vw"
            />
          ) : null}
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {visibleImages.map((image) => {
            const selected = image.id === activeImage?.id;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImageId(image.id)}
                className={`relative aspect-square overflow-hidden rounded-[1.35rem] border bg-white transition ${
                  selected
                    ? "border-ink shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                    : "border-ink/8 hover:border-ink/24"
                }`}
                aria-label={`View ${image.label.toLowerCase()} image`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="panel h-fit p-7 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
          Drop 001 - Access
        </p>
        <h1 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink sm:text-5xl">
          {product.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-3xl font-semibold text-ink">{product.price}</p>
          <span className="rounded-full border border-ink/12 bg-ink/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
            Wear the Mission
          </span>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
              Color
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const selected = selectedColor === color;

                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color);
                      const firstImageForColor = product.images.find(
                        (image) => image.color === color,
                      );
                      setSelectedImageId(firstImageForColor?.id ?? "");
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selected
                        ? "border-ink bg-ink text-white"
                        : "border-ink/10 bg-white text-ink hover:border-ink/22"
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
              Size
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const selected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                      selected
                        ? "border-ink bg-ink text-white"
                        : "border-ink/10 bg-white text-ink hover:border-ink/22"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-ink/12 bg-ink/4 p-4 text-sm leading-7 text-ink">
            Every purchase supports access to emergency veterinary care and
            helps build the lifeline.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={product.liveHref} external className="sm:flex-1">
              View Live Availability
            </ButtonLink>
            <ButtonLink
              href={product.collectionHref}
              external
              variant="secondary"
              className="sm:flex-1"
            >
              Shop Drop 001
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
