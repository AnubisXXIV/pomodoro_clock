import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Controls = ({ data, increment, decrement }) => {
    return (
        <div id={`${data.type}-controls`} className='controls-wrapper'>
            <h3 id={`${data.type}-label`}>{data.title} Length</h3>
            <button id={`${data.type}-decrement`} className='controls-btn length-btn' onClick={() => decrement(data.type)}><FontAwesomeIcon icon={faArrowDown} /></button>
            <p id={`${data.type}-length`} className='length-label'>{data.time / 60}</p>
            <button id={`${data.type}-increment`} className='controls-btn length-btn' onClick={() => increment(data.type)}><FontAwesomeIcon icon={faArrowUp} /></button>
        </div>
    )
}

export default Controls