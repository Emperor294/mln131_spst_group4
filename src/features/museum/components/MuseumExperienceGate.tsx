'use client';

import dynamic from 'next/dynamic';
import { Component, type ReactNode, useEffect, useState } from 'react';
import LightweightMuseum from '../fallback/LightweightMuseum';
import {
  detectMuseumCapabilities,
  type MuseumCapabilities,
  type MuseumExperienceMode,
} from '../runtime/museum-capabilities';

const Full3DMuseum = dynamic(() => import('@/features/game/GameModel'), {
  ssr: false,
  loading: () => <MuseumModeShell label="Đang mở không gian 3D…" />,
});

function MuseumModeShell({ label = 'Đang chuẩn bị trải nghiệm bảo tàng…' }: { label?: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b1020] px-5 text-white" aria-live="polite">
      <div className="w-full max-w-md border border-white/10 bg-[#11172a] p-7 text-center shadow-2xl">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#d3a06d]">SOCIALISM 360</p>
        <p className="mt-3 text-sm text-white/70">{label}</p>
      </div>
    </main>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  onFailure: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class Full3DErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV !== 'production') console.warn('[museum] Full 3D experience failed; using lightweight fallback.', error);
    this.props.onFailure();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default function MuseumExperienceGate() {
  const [capabilities, setCapabilities] = useState<MuseumCapabilities | null>(null);
  const [mode, setMode] = useState<MuseumExperienceMode>('detecting');
  const [confirmFull3D, setConfirmFull3D] = useState(false);
  const [failureNotice, setFailureNotice] = useState<string | undefined>();

  useEffect(() => {
    try {
      const detected = detectMuseumCapabilities();
      setCapabilities(detected);
      setMode(detected.preferredMode);
    } catch {
      setCapabilities(null);
      setMode('lightweight');
    }
  }, []);

  if (mode === 'detecting' || !capabilities && mode !== 'lightweight') {
    return <MuseumModeShell />;
  }

  if (mode === 'lightweight') {
    return (
      <LightweightMuseum
        notice={failureNotice}
        onRequestFull3D={capabilities?.webglAvailable ? () => setConfirmFull3D(true) : undefined}
        full3DConfirmationOpen={confirmFull3D}
        onCancelFull3D={() => setConfirmFull3D(false)}
        onConfirmFull3D={() => {
          setConfirmFull3D(false);
          setFailureNotice(undefined);
          setMode('full-3d');
        }}
      />
    );
  }

  return (
    <Full3DErrorBoundary
      onFailure={() => {
        setFailureNotice('Không thể tải không gian 3D. Bạn đang xem bảo tàng ở chế độ nhẹ.');
        setMode('lightweight');
      }}
    >
      <Full3DMuseum />
    </Full3DErrorBoundary>
  );
}
