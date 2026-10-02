import { useState } from "react";
import { site } from "../data/site";

// Round profile photo over the banner.
// Put your photo in the  public  folder as  photo.jpg  (square works best, ~600 x 600),
// or change the path in  src/data/site.js -> photo.
// Until the file exists, a simple placeholder is shown.
export default function Avatar() {
  const [src, setSrc] = useState(site.photo);
  return (
    <div className="avatar">
      <img
  src={src}
  alt={site.name}
  width="140"
  height="140"
  onError={() =>
    src !== "/photo-placeholder.svg" &&
    setSrc("/photo-placeholder.svg")
  }
/>
    </div>
  );
}
