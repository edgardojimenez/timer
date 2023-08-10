import { Component, createSignal } from "solid-js";
import styles from './Timer.module.css';
import { ITimerProps } from "./types";

const Timer: Component<ITimerProps> = (props: ITimerProps) => {

  const STATE_PLAYING = 1;
  const STATE_PAUSED = 2;
  const STATE_STOPPED = 0;

  let duration = 0;

  let state = STATE_STOPPED;

  if (props.hours > 0) {
    duration = (props.hours * 3600);
  }

  if (props.minutes > 0) {
    duration += (props.minutes * 60);
  }

  if (props.seconds > 0) {
    duration += (props.seconds);
  }

  const [getProgressValue, setProgressValue] = createSignal(duration);
  const [getProgress, setProgress] = createSignal(0);

  const speed = 1000;
  const steps = 360 / duration;

  const audio = new Audio(props.ringtone);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const secondsRemainder = seconds - (hours * 3600) - (minutes * 60);
    const secondsString = secondsRemainder < 10 ? `0${secondsRemainder}` : `${secondsRemainder}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    return `${hoursString}:${minutesString}:${secondsString}`;
  }

  const reset = () => {
    clearInterval(progress);
    setProgressValue(duration);
    setProgress(0);
    state = STATE_STOPPED;
  };

  const progress: any = setInterval(() => {
    if (getProgressValue() === 0 && state == STATE_PLAYING) {

      if (props.repeat) {
        audio.play();
        setProgressValue(duration);
        setProgress(0);
        state = STATE_PLAYING;
      } else {
        //clearInterval(progress);
        audio.play();
        state = STATE_STOPPED;
      }

    } else {
      if (state == STATE_PLAYING) {
        setProgressValue(getProgressValue() - 1);
        setProgress(getProgress() + steps)
        state = STATE_PLAYING;
      }
    }

    console.log(getProgressValue());

  }, speed);

  const toggle = () => {
    if (state == STATE_PLAYING) {
      state = STATE_PAUSED;
      return
    }

    if (state == STATE_PAUSED) {
      state = STATE_PLAYING;
      return
    }

    if (state == STATE_PAUSED || state == STATE_STOPPED) {
      setProgressValue(duration);
      setProgress(0);
      state = STATE_PLAYING;
      return
    }
  };

  return (
    <div class={styles.container} onclick={toggle}>
      <div class={styles.circularProgress} style={`background: conic-gradient(${props.backgroundColor} ${getProgress()}deg, ${props.color} 0deg);`} >
        <span class={styles.progressValue}>{formatTime(getProgressValue())}</span>
      </div>
    </div>
  );
};

export default Timer;
