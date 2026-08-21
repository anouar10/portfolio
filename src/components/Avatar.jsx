import { useState } from "react";
import { PROFILE } from "../data/profile.js";

/**
 * Shows the photo when one is set, and degrades to an initials monogram if the
 * file is missing or fails to load — the card never renders a broken image.
 */
export function Avatar({ src = PROFILE.photo, alt = PROFILE.name }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="avatar">
      {showImage ? (
        <img src={src} alt={alt} width="68" height="68" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="avatar-fallback" aria-hidden="true">{PROFILE.initials}</div>
      )}
    </div>
  );
}
