import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import logo from './logo.png';  // Asegúrate de que la ruta es correcta

function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const [isDelayed, setDelayed] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // Estado para controlar el pop-up
    const [showLogo, setShowLogo] = useState(false); // Estado para mostrar el logo
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
                
                const livePosition = videoRef.current.duration;
                let delay = livePosition - videoRef.current.currentTime;

                if(livePosition<16){
                    setShowLogo(true)
                }else{
                    setShowLogo(false)
                }
                
                setDelayed(delay > 10);

                if (delay > 30) {
                    if (!showPopup) {
                        alert("El video está retrasado más de 30 segundos.");
                        setShowPopup(true);
                    }
                } else {
                    setShowPopup(false);
                }

                
            }
            else{
                setShowLogo(true)
            }
        };

        const interval = setInterval(checkDelay, 1000); // Verifica cada segundo

        return () => {
            if (hls.current) {
                hls.current.destroy();
            }
            clearInterval(interval);
        };
    }, [src, showPopup]);

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
            {showLogo && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <img src={logo} alt="Loading..." />
                </div>
            )}
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
