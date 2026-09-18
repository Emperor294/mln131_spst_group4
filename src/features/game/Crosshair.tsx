'use client';

type Props = {
  isHoveringObject?: boolean;
};

export default function Crosshair({ isHoveringObject = false }: Props) {
  const borderColor = isHoveringObject ? 'border-blue-500' : 'border-white';
  const dotColor = isHoveringObject ? 'bg-blue-500' : 'bg-white';
  const scale = isHoveringObject ? 'scale-110' : 'scale-100';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-transform duration-150 ${borderColor} ${scale}`}>
        <div className={`w-1 h-1 ${dotColor} rounded-full`}></div>
      </div>
    </div>
  );
}
