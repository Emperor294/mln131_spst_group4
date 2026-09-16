'use client';

type Props = {
  isHoveringObject?: boolean;
};

export default function Crosshair({ isHoveringObject = false }: Props) {
  const borderColor = isHoveringObject ? 'border-blue-500' : 'border-white';
  const dotColor = isHoveringObject ? 'bg-blue-500' : 'bg-white';

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
      <div className={`w-4 h-4 border-2 ${borderColor} rounded-full flex items-center justify-center`}>
        <div className={`w-1 h-1 ${dotColor} rounded-full`}></div>
      </div>
    </div>
  );
} 