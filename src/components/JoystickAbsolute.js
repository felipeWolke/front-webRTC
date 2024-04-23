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
            const body = { x, y, zoom, camId: numberCamera };  // Datos enviados en el cuerpo de la solicitud
            console.log('Sending move command to camera');
            const response = await connect.post(path, body);  // Usando el método post de Connect
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
            <h3>Rotador X/Y</h3>
            <button disabled={isDisabled} onClick={() => handleMove(0, 1, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <div className="flex space-x-10">
                <button disabled={isDisabled} onClick={() => handleMove(-0.5, 0, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400" disabled={isDisabled} onClick={() => handleMove(0, 0, 0)}>
                    <FontAwesomeIcon icon={faDotCircle} />
                </button>
                <button disabled={isDisabled} onClick={() => handleMove(0.5, 0, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
            <button disabled={isDisabled} onClick={() => handleMove(0, -1, 0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <div className="flex space-x-4 mt-4">
                
            </div>
        </div>
    );
}

export default JoystickAbsolute;
