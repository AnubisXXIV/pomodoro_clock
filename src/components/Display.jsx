import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRotate } from '@fortawesome/free-solid-svg-icons';
import timeConverter from '../helper';

const Display = ({ displayState, startStop, reset }) => {
    return (
        <div className="timer-wrapper">
            <h1 id='timer-label'>{displayState.timeDisplay}</h1>
            <p id='time-left' style={{ color: displayState.isTimeRunning ? 'red' : 'white' }}>{timeConverter(displayState.time)}</p>
            <div className="timer-controls">
                <button id='start_stop' className='controls-btn session-btn' onClick={startStop}>
                    <FontAwesomeIcon icon={faPlay} />
                    <FontAwesomeIcon icon={faPause} />
                </button>
                <button id='reset' className='controls-btn session-btn'><FontAwesomeIcon icon={faRotate} onClick={reset} /></button>
            </div>
        </div>
    )
}

export default Display