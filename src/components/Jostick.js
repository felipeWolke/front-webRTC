import React, { useMemo, useState } from 'react';
import Connect from '../connect/Connect';

function Joystick({ numberCamera }) {
    const connect = useMemo(() => new Connect(), []);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleMove = async (x, y, zoom) => {
        setIsDisabled(true);

        try {
            const path = `/move`; // Asume que tu API tiene un endpoint /move
            const queryParams = { x, y, zoom, camera: numberCamera }; // Ejemplo de cómo podrías pasar el número de cámara y los parámetros de movimiento
            console.log('Sending move command to camera');
            const response = await connect.get(path, queryParams);
            console.log('Respuesta de la API:', response);
        } catch (error) {
            console.error('Error al mover la cámara:', error);
        } finally {
            setTimeout(() => {
                setIsDisabled(false);
            }, 3000);
        }
    };

    return (
        <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4">
            <button
                disabled={isDisabled}
                onClick={() => handleMove(0, -0.08, 0)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Arriba
            </button>
            <button
                disabled={isDisabled}
                onClick={() => handleMove(0, 0.08, 0)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Abajo
            </button>
            <button
                disabled={isDisabled}
                onClick={() => handleMove(-0.08, 0, 0)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Izquierda
            </button>
            <button
                disabled={isDisabled}
                onClick={() => handleMove(0.08, 0, 0)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Derecha
            </button>
            <button
                disabled={isDisabled}
                onClick={() => handleMove(0, 0, 0.05)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Zoom In
            </button>
            <button
                disabled={isDisabled}
                onClick={() => handleMove(0, 0, -0.05)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Zoom Out
            </button>
        </div>
    );
}

export default Joystick;
