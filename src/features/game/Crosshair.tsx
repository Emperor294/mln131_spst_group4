'use client';

type Props = {
  interactionKind?: 'artifact' | 'concept-station' | null;
};

export default function Crosshair({ interactionKind = null }: Props) {
  const isAcademic = interactionKind === 'concept-station';
  const isHovering = Boolean(interactionKind);
  const borderColor = isAcademic ? 'border-[#d3a06d]' : interactionKind === 'artifact' ? 'border-[#9db7d4]' : 'border-white/80';
  const dotColor = isAcademic ? 'bg-[#d3a06d]' : interactionKind === 'artifact' ? 'bg-[#9db7d4]' : 'bg-white';
  const scale = isAcademic ? 'scale-110' : isHovering ? 'scale-105' : 'scale-100';
  const borderStyle = isAcademic ? 'border-dashed' : 'border-solid';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`museum-motion flex h-4 w-4 items-center justify-center rounded-full border-2 transition-[transform,opacity] duration-150 ${borderColor} ${borderStyle} ${scale}`}>
        <div className={`w-1 h-1 ${dotColor} rounded-full`}></div>
      </div>
    </div>
  );
}
