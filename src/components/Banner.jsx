import { useState } from "react";
import { FiImage } from "react-icons/fi";
import { site } from "../data/site";

// Banner with TWO images: one for dark mode, one for light mode.
// Save them in the  public  folder as  banner-dark.jpg  and  banner-light.jpg
const PATHS = typeof site.banner === "string" ? { dark: site.banner, light: site.banner } : site.banner;

function Slot({ mode }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`banner-slot banner-${mode}`}>
      {ok ? (
        <img src={PATHS[mode]} alt="" className="banner-img" onError={() => setOk(false)} />
      ) : (
        <div className="banner-empty">
          <FiImage size={26} />
          <p>Your {mode}-mode banner goes here</p>
          <code>public{PATHS[mode]}</code>
        </div>
      )}
    </div>
  );
}

export default function Banner() {
  return (
    <div className="banner">
      <Slot mode="dark" />
      <Slot mode="light" />
    </div>
  );
}
