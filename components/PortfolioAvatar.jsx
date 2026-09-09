"use client";

/* Dynamic user-provided image URLs cannot use next/image optimization. */
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { getProjectImageUrl } from "../lib/content";

function getInitials(label = "Item") {
  return label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function PortfolioAvatar({ label, src, className = "" }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = getProjectImageUrl(src);
  const showImage = Boolean(imageUrl) && !failed;

  return (
    <div className={`portfolio-avatar ${className}`} aria-label={label}>
      {showImage ? (
        <img src={imageUrl} alt="" onError={() => setFailed(true)} />
      ) : (
        <span>{getInitials(label)}</span>
      )}
    </div>
  );
}
