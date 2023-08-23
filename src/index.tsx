/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { ITimerProps } from './types';
import ringtone from './assets/beeps.mp3';

const urlParams = new URLSearchParams(window.location.search);

const root = document.getElementById('root');
console.log(`ring tone: ${ringtone}`)
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const appProps: ITimerProps = {
  hours: parseInt(urlParams.get('h') || '0'),
  minutes: parseInt(urlParams.get('m') || '0'),
  seconds: parseInt(urlParams.get('s') || '0'),
  repeat: urlParams.get('r') === null ? true : Boolean(parseInt(urlParams.get('r')!)),
  backgroundColor: '#C2DEDC',
  color: '#116A7B',
  ringtone: ringtone
}


render(() => <App {...appProps} />, root!);

