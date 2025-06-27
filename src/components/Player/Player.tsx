import React, { FC, useState, useRef, useEffect } from 'react'
import { Track } from '../../types/typedefs';

interface Props {
  track: Track | null;
  playlist: Track[];
}


export const Player: FC<Props> = ({ track, playlist }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const sliderRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (track && audioRef.current) {
      const audio = audioRef.current;
      audio.pause();
      audio.load();
      setIsPlaying(false);
    }
  }, [track]);

  const handlePlay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('не вадалось відкрити аудіо', err);
      }
    }
  };
  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);

    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);
  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      if (audioRef.current && sliderRef.current) {
        sliderRef.current.value = audioRef.current.currentTime.toString();
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef}>
        <source src={track?.preview} type="audio/mp4" />
        Браузер не підтримує аудіо
      </audio>
      <div className="footer__player__controls__wrapper">
        <button
          className="footer__player__btn btn back__btn"
          onClick={(handlePlay)}
        />
        {isPlaying ? (
          <button
            className="footer__player__btn btn pause__btn"
            onClick={(handlePause)}
          />
        ) : <button
          className="footer__player__btn btn play__btn"
          onClick={(handlePlay)}
        />}

        <button
          className="footer__player__btn btn next__btn"
          onClick={(handlePlay)}
        />
      </div>
      <div className="footer__player__duration__wrapper">
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max={duration}
          onChange={(e) => {
            const newTime = Number(e.target.value);
            if (audioRef.current) {
              audioRef.current.currentTime = newTime;
            }
          }}
          className="footer__player__duration"
        />
      </div>
    </>

  );
}
