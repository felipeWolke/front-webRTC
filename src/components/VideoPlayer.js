import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const [isDelayed, setDelayed] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // Estado para controlar el pop-up
    const hls = useRef(null);

    useEffect(() => {
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(src);
            hls.current.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
        }

        const checkDelay = () => {
            if (videoRef.current && videoRef.current.buffered.length > 0) {
                const endOfBuffer = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
                const livePosition = videoRef.current.duration;
                const delay = livePosition - endOfBuffer;
                setDelayed(delay > 10);
                
                // Muestra un pop-up si el retraso es mayor de 5 segundos
                if (delay > 5) {
                    if (!showPopup) { // Esto evita que el pop-up se muestre continuamente
                        alert("El video está retrasado más de 5 segundos.");
                        setShowPopup(true); // Activa el estado para que el pop-up no se repita
                    }
                } else {
                    setShowPopup(false); // Restablece el estado si el retraso es menor de 5 segundos
                }
            }
        };

        const interval = setInterval(checkDelay, 1000); // Verifica cada segundo

        return () => {
            if (hls.current) {
                hls.current.destroy();
            }
            clearInterval(interval);
        };
    }, [src, showPopup]); // Añade showPopup a la lista de dependencias

    const handleLiveSeek = () => {
        const video = videoRef.current;
        if (video && video.buffered.length > 0) {
            const endOfBuffer = video.buffered.end(video.buffered.length - 1);
            video.currentTime = endOfBuffer;
            setDelayed(false);
        }
    };

    return (
        <div className="relative w-full">
            <video ref={videoRef} controls className="w-full aspect-video" />
            <button
                onClick={handleLiveSeek}
                className={`absolute top-10 right-2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer ${isDelayed ? 'bg-transparent text-red-500' : 'bg-red-500 text-white'}`}
                title="Go to live"
            >
                LIVE
            </button>
        </div>
    );
}

export default VideoPlayer;
