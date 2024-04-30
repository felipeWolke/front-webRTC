import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import logo from './logo.png';

function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const [isDelayed, setDelayed] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
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
                const delay = livePosition - videoRef.current.currentTime;

                setShowLogo(livePosition < 8);
                setDelayed(delay > 4);

                if (delay > 15 && !showPopup) {
                    alert("El video está retrasado más de 15 segundos.");
                    setShowPopup(true);
                } else {
                    setShowPopup(false);
                }

                if (delay > 3) {
                    videoRef.current.currentTime = livePosition;
                }
            } else {
                setShowLogo(true);
            }
        };

        const interval = setInterval(checkDelay, 1000);

        return () => {
            if (hls.current) {
                hls.current.destroy();
            }
            clearInterval(interval);
        };
    }, [src, showPopup]);

    return (
        <div className="relative w-full">
            <video ref={videoRef} className="w-full h-auto aspect-video" autoPlay muted />
            {showLogo && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <img src={logo} alt="Loading..." className="max-w-full h-auto" />
                </div>
            )}
            <button
                onClick={() => videoRef.current && (videoRef.current.currentTime = videoRef.current.duration)}
                className={`absolute top-10 right-2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer ${isDelayed ? 'bg-red-500 text-white' : 'bg-transparent text-red-500'}`}
                title="Go to live"
            >
                LIVE
            </button>
        </div>
    );
}

export default VideoPlayer;
