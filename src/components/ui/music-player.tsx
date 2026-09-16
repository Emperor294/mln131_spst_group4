"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Repeat } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoop, setIsLoop] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicSrc = "/rap.mp3";

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const seekBy = useCallback((delta: number) => {
    if (!audioRef.current) return;
    const next = Math.min(Math.max(0, audioRef.current.currentTime + delta), duration || audioRef.current.duration || 0);
    audioRef.current.currentTime = next;
    setCurrentTime(next);
  }, [duration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.loop = isLoop;
    }
  }, [volume, isMuted, isLoop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => {
      if (!isSeeking) setCurrentTime(audio.currentTime || 0);
    };
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [isSeeking]);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!audioRef.current) return;
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekBy(5);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekBy(-5);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume(v => Math.min(1, +(v + 0.1).toFixed(2)));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume(v => Math.max(0, +(v - 0.1).toFixed(2)));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [seekBy, togglePlay]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
      setIsLoop(!isLoop);
    }
  };

  const formatTime = (secs: number) => {
    if (!isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const onSeekStart = () => setIsSeeking(true);
  const onSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[280px] sm:w-[320px] bg-white/90 backdrop-blur-md border border-black/10 rounded-xl p-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]">
      <audio
        ref={audioRef}
        src={musicSrc}
        loop={isLoop}
        onEnded={() => setIsPlaying(false)}
        onError={() => console.log('Audio file not found')}
      />
      {/* Compact left-bottom layout */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 bg-red-900 text-white rounded-full hover:bg-red-800 transition-colors"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[10px] font-sub text-red-900/80 w-8 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            aria-label="Vị trí phát âm thanh"
            min={0}
            max={Math.max(duration, 0.000001)}
            step={0.1}
            value={currentTime}
            onMouseDown={onSeekStart}
            onTouchStart={onSeekStart}
            onChange={onSeekChange}
            onMouseUp={() => {
              if (audioRef.current) audioRef.current.currentTime = currentTime;
              setIsSeeking(false);
            }}
            onTouchEnd={() => {
              if (audioRef.current) audioRef.current.currentTime = currentTime;
              setIsSeeking(false);
            }}
            className="w-full h-1.5 bg-red-900/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${duration ? (currentTime / duration) * 100 : 0}%, #fecaca ${duration ? (currentTime / duration) * 100 : 0}%, #fecaca 100%)`
            }}
          />
          <span className="text-[10px] font-sub text-red-900/60 w-8">{formatTime(duration)}</span>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          className="text-red-900 hover:text-red-800 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button
          type="button"
          onClick={toggleLoop}
          className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${isLoop ? 'border-red-900 text-red-900 bg-red-50' : 'border-red-900/30 text-red-900/70 hover:text-red-900 hover:border-red-900/60'}`}
          aria-label={isLoop ? 'Disable loop' : 'Enable loop'}
          title={isLoop ? 'Loop is on' : 'Loop is off'}
        >
          <Repeat size={14} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
