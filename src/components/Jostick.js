import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import Connect from '../connect/Connect';

function Joystick({ numberCamera }) {
    const connect = useRef(new Connect()).current;
    const [isDisabled, setIsDisabled] = useState(false);

    const handleMove = async (x, y, zoom) => {
        setIsDisabled(true);

        try {
            const path = `/move`;
            const queryParams = { x, y, zoom, camId: numberCamera }; // Asegúrate de que esto coincida con el servidor
            console.log('Sending move command to camera');
            const response = await connect.get(path, queryParams); // Cambiado a POST si es necesario
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
            <button disabled={isDisabled} onClick={() => handleMove(0, -0.2, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <div className="flex space-x-10">
                <button disabled={isDisabled} onClick={() => handleMove(-0.2, 0, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button disabled={isDisabled} onClick={() => handleMove(0.2, 0, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
            <button disabled={isDisabled} onClick={() => handleMove(0, 0.2, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <div className="flex space-x-4 mt-4">
                <button disabled={isDisabled} onClick={() => handleMove(0, 0, 0.1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faSearchPlus} />
                </button>
                <button disabled={isDisabled} onClick={() => handleMove(0, 0, -0.1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faSearchMinus} />
                </button>
            </div>
        </div>
    );
}

export default Joystick;
