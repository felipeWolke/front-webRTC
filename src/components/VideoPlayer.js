import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import logo from './logo.png'

function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const [isDelayed, setDelayed] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si el video se está reproduciendo
    const hls = useRef(null);

    useEffect(() => {
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(src);
            hls.current.attachMedia(videoRef.current);
            hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
                setIsPlaying(true);
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            videoRef.current.oncanplay = () => setIsPlaying(true);
        }

        const checkDelay = () => {
            if (videoRef.current && videoRef.current.buffered.length > 0) {
                const endOfBuffer = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
                const livePosition = videoRef.current.duration;
                const delay = livePosition - endOfBuffer;
                setDelayed(delay > 10);

                if (delay > 5) {
                    if (!showPopup) {
                        alert("El video está retrasado más de 5 segundos.");
                        setShowPopup(true);
                    }
                } else {
                    setShowPopup(false);
                }
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
            {isPlaying ? (
                <video ref={videoRef} controls className="w-full aspect-video" />
            ) : (
                <img src={logo} alt="No transmission" className="w-full aspect-video" />
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
