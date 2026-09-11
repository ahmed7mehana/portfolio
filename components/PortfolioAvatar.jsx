"use client";

/* Dynamic user-provided image URLs cannot use next/image optimization. */
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { getProjectImageCandidates } from "../lib/content";

function getInitials(label = "Item") {
  return label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function PortfolioAvatar({ label, src, className = "" }) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const imageUrls = getProjectImageCandidates(src);
  const imageUrl = imageUrls[candidateIndex];
  const showImage = Boolean(imageUrl);

  const handleImageError = () => {
    if (candidateIndex < imageUrls.length - 1) {
      setCandidateIndex((index) => index + 1);
    } else {
      setCandidateIndex(imageUrls.length);
    }
  };

  return (
    <div className={`portfolio-avatar ${className}`} aria-label={label}>
      {showImage ? (
        <img key={imageUrl} src={imageUrl} alt="" onError={handleImageError} />
      ) : (
        <span>{getInitials(label)}</span>
      )}
    </div>
  );
}
