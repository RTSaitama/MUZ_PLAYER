import React, { FC, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playNextTrack, playPreviousTrack, togglePlayPause } from '../../store/slices/playerSlice';
import type { RootState } from '../../store/store';

export const Player: FC = () => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, playlistQueue, currentQueueIndex } = useSelector(
    (state: RootState) => state.player
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

   useEffect(() => {
    if (currentTrack && audioRef.current) {
      const audio = audioRef.current;
      audio.pause();
      audio.load();
    }
  }, [currentTrack]);

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

   useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentTrack?.preview) {
      audio.play().catch(err => console.error('Play error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

   useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(playNextTrack());
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [dispatch]);

  const handlePlay = async () => {
    dispatch(togglePlayPause());
  };

  const handlePause = () => {
    dispatch(togglePlayPause());
  };

  const handlePrevious = () => {
    dispatch(playPreviousTrack());
  };

  const handleNext = () => {
    dispatch(playNextTrack());
  };

  const canPlayPrevious = playlistQueue.length > 0 && currentQueueIndex > 0;
  const canPlayNext = playlistQueue.length > 0 && currentQueueIndex < playlistQueue.length - 1;

  return (
    <>
      <audio ref={audioRef}>
        <source src={currentTrack?.preview} type="audio/mp4" />
        Браузер не підтримує аудіо
      </audio>
      <div className="footer__player__controls__wrapper">
        <button
          className="footer__player__btn btn back__btn"
          onClick={handlePrevious}
          disabled={!canPlayPrevious}
        />
        {isPlaying ? (
          <button
            className="footer__player__btn btn pause__btn"
            onClick={handlePause}
          />
        ) : (
          <button
            className="footer__player__btn btn play__btn"
            onClick={handlePlay}
          />
        )}
        <button
          className="footer__player__btn btn next__btn"
          onClick={handleNext}
          disabled={!canPlayNext}
        />
      </div>
      <div className="footer__player__duration__wrapper">
        <input
          ref={sliderRef}
          type="range"
          step="0.01"
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
};