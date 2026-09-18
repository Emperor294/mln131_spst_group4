export type MuseumExperienceMode = "detecting" | "full-3d" | "lightweight";

export interface MuseumCapabilities {
  finePointer: boolean;
  coarsePointer: boolean;
  hover: boolean;
  touchFirst: boolean;
  adequateViewport: boolean;
  webglAvailable: boolean;
  saveData: boolean;
  preferredMode: Exclude<MuseumExperienceMode, "detecting">;
}

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2")
      ?? canvas.getContext("webgl")
      ?? canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

/** Read capability signals only on the client, after the neutral shell mounts. */
export function detectMuseumCapabilities(): MuseumCapabilities {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hover = window.matchMedia("(hover: hover)").matches;
  const touchFirst = (coarsePointer && !finePointer) || (navigator.maxTouchPoints > 0 && !hover);
  const adequateViewport = window.innerWidth >= 900;
  const webglAvailable = canCreateWebGLContext();
  const saveData = "connection" in navigator
    && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const preferredMode = finePointer && hover && adequateViewport && webglAvailable && !saveData
    ? "full-3d"
    : "lightweight";

  return {
    finePointer,
    coarsePointer,
    hover,
    touchFirst,
    adequateViewport,
    webglAvailable,
    saveData,
    preferredMode,
  };
}
