import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./PageEffects.css";

export default function PageEffects() {
  const { pathname } = useLocation();
  const transitionRef = useRef(null);

  useEffect(() => {
    const transition = transitionRef.current;
    transition?.classList.remove("is-changing");
    window.requestAnimationFrame(() => transition?.classList.add("is-changing"));

    const transitionTimer = window.setTimeout(
      () => transition?.classList.remove("is-changing"),
      620
    );
    return () => {
      window.clearTimeout(transitionTimer);
    };
  }, [pathname]);

  return (
    <>
      <div ref={transitionRef} className="route-transition" aria-hidden="true">
        <span />
      </div>
      <div className="page-effects" aria-hidden="true">
        <div className="paper-grain" />
        <div className="wayang-pattern" />
      </div>
    </>
  );
}
