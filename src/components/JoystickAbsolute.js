import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faSearchPlus, faSearchMinus, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import Connect from '../connect/Connect';

function JoystickAbsolute({ numberCamera }) {
    const connect = useRef(new Connect()).current;
    const [isDisabled, setIsDisabled] = useState(false);

    const handleMove = async (x, y, zoom) => {
        setIsDisabled(true);

        try {
            const path = `/moveAbsolute`;
            const queryParams = { x, y, zoom, camId: numberCamera };
            console.log('Sending move command to camera');
            const response = await connect.get(path, queryParams);
            console.log('API Response:', response);
        } catch (error) {
            console.error('Error moving camera:', error);
        } finally {
            setTimeout(() => {
                setIsDisabled(false);
            }, 3000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <button disabled={isDisabled} onClick={() => handleMove(0, -1, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <div className="flex space-x-10">
                <button disabled={isDisabled} onClick={() => handleMove(-0.5, 0, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400" disabled={isDisabled} onClick={() => handleMove(0, 0, 0.5)}>
                    <FontAwesomeIcon icon={faDotCircle} />
                </button>
                <button disabled={isDisabled} onClick={() => handleMove(0.5, 0, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
            <button disabled={isDisabled} onClick={() => handleMove(0, 1, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <div className="flex space-x-4 mt-4">
                
            </div>
        </div>
    );
}

export default JoystickAbsolute;
