import React, { useMemo, useState } from 'react';
import Connect from '../connect/Connect'; // Asegúrate de que la ruta sea correcta

function Joystick({ numberCamera }) {
    const connect = useMemo(() => new Connect(), []);
    const [isDisabled, setIsDisabled] = useState(false); // Estado para controlar la deshabilitación de los botones

    const handleMove = async (direction) => {
        setIsDisabled(true); // Deshabilita los botones al hacer clic

        try {
            const path = `/camera/${numberCamera}`;
            const data = { direction };
            const response = await connect.post(path, data);
            console.log('Respuesta de la API:', response.data);
        } catch (error) {
            console.error('Error al mover la cámara:', error);
        } finally {
            setTimeout(() => {
                setIsDisabled(false); // Habilita los botones después de 3 segundos
            }, 3000);
        }
    };

    return (
        <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4">
    <button
        disabled={isDisabled}
        onClick={() => handleMove('up')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 h-full"
    >
        Arriba
    </button>
    <button
        disabled={isDisabled}
        onClick={() => handleMove('down')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 h-full"
    >
        Abajo
    </button>
    <button
        disabled={isDisabled}
        onClick={() => handleMove('left')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 h-full"
    >
        Izquierda
    </button>
    <button
        disabled={isDisabled}
        onClick={() => handleMove('right')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 h-full"
    >
        Derecha
    </button>
    <button
        disabled={isDisabled}
        onClick={() => handleMove('zoomIn')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 h-full"
    >
        Zoom In
    </button>
    <button
        disabled={isDisabled}
        onClick={() => handleMove('zoomOut')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 h-full"
    >
        Zoom Out
    </button>
</div>

    );
}

export default Joystick;
