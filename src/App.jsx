import './App.css';
import { useState, useEffect } from 'react';
import Controls from './components/Controls';
import Display from './components/Display';

const defaultSessionTime = 25 * 60;
const defaultBreakTime = 5 * 60;
const max = 60 * 60;
const min = 1 * 60;

function App() {

  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [displayState, setDisplayState] = useState({
    time: defaultSessionTime,
    timeDisplay: 'Session',
    isTimeRunning: false
  });

  // set and clear timer
  useEffect(() => {
    let timerId;
    if (!displayState.isTimeRunning) return;

    if (displayState.isTimeRunning) {
      const buttons = document.querySelectorAll('.length-btn');
      buttons.forEach((btn) => {
        btn.setAttribute('disabled', '');
      });
      timerId = window.setInterval(decrementDisplay, 500);
    }

    return () => {
      const buttons = document.querySelectorAll('.length-btn');
      buttons.forEach((btn) => {
        btn.removeAttribute('disabled', '');
      });
      window.clearInterval(timerId);
    }

  }, [displayState.isTimeRunning]);

  useEffect(() => {
    if (displayState.time <= 0) {
      const audio = document.getElementById('beep');
      audio.volume = 0.05;
      audio.currentTime = 0;
      audio.play();

      setDisplayState(prev => ({
        ...prev,
        timeDisplay: prev.timeDisplay === 'Session' ? 'Break' : 'Session',
        time: prev.timeDisplay === 'Session' ? breakTime : sessionTime
      }));
    }
  }, [breakTime, sessionTime, displayState])


  // refresh display clock with set timer
  useEffect(() => {
    setDisplayState(prev => ({
      ...prev,
      time: sessionTime
    }))
  }, [sessionTime])

  const decrementDisplay = () => {
    setDisplayState(prev => ({
      ...prev,
      time: prev.time - 0.5
    }));
  };

  const handleIncrement = (type) => {
    if (type === 'break') {
      console.log('inc break');
      if (breakTime >= max) return;
      setBreakTime(breakTime + 60);
    } else {
      console.log('inc session');
      if (sessionTime >= max) return;
      setSessionTime(sessionTime + 60);
    }
  };

  const handleDecrement = (type) => {
    if (type === 'break') {
      console.log('dec break');
      if (breakTime <= min) return;
      setBreakTime(breakTime - 60);
    } else {
      console.log('dec session');
      if (sessionTime <= min) return;
      setSessionTime(sessionTime - 60);
    };
  }

  const handleStartStop = () => {
    console.log('start_stop');
    setDisplayState(prev => ({
      ...prev,
      isTimeRunning: !prev.isTimeRunning
    }));

  };

  const handleReset = () => {
    setDisplayState({
      time: defaultSessionTime,
      timeDisplay: 'Session',
      isTimeRunning: false
    });
    console.log('reset');
    setSessionTime(defaultSessionTime);
    setBreakTime(defaultBreakTime);


    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };



  return (
    <div className="App">
      <h1>Timer</h1>
      <audio src="https://bigsoundbank.com/UPLOAD/mp3/1489.mp3" id="beep"></audio>
      <div id="app-wrapper">

        <div id='controls'>

          <Controls data={{ time: breakTime, type: 'break', title: 'Break' }} increment={handleIncrement} decrement={handleDecrement} />
          <Controls data={{ time: sessionTime, type: 'session', title: 'Session' }} increment={handleIncrement} decrement={handleDecrement} />

        </div>

        <Display displayState={displayState} startStop={handleStartStop} reset={handleReset} />
        <audio src="https://bigsoundbank.com/UPLOAD/mp3/1489.mp3" id='beep'></audio>
      </div>
    </div>
  );
}


export default App;
