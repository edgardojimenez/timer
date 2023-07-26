import type { Component } from 'solid-js';

import styles from './App.module.css';
import Timer from './Timer';
import { ITimerProps } from './types';

const App: Component = () => {
const props: ITimerProps = {
  hours: 0,
  minutes: 0,
  seconds: 15,
  repeat: true,
  backgroundColor: '#C2DEDC',
  color: '#116A7B',
  ringtone:'./src/assets/Real-Alarm-Beeps.mp3'
};

  return (
    <Timer {...props} />
  );
};

export default App;
