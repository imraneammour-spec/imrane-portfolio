export const motionPreferenceEvent = "imrane:motion-preference";
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return true;
  if (document.documentElement.dataset.motion === "reduced") return true;
  try {
    return localStorage.getItem("imrane-motion") === "reduced";
  } catch {
    return false;
  }
}
