import type { Component } from 'solid-js';

import styles from './App.module.css';
import Timer from './Timer';
import { ITimerProps } from './types';

const App: Component<ITimerProps> = (props: ITimerProps) => {

  return (
    <Timer {...props} />
  );
};

export default App;
