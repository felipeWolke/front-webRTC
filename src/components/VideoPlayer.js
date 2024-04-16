import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDelayed, setDelayed] = useState(false);
    const hls = useRef(null);

    useEffect(() => {
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(src);
            hls.current.attachMedia(videoRef.current);
            hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsPlaying(true);
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            setIsPlaying(true);
        }

        videoRef.current.onerror = () => {
            setIsPlaying(false); // Cambia a false si hay un error de carga
        };

        const checkDelay = () => {
            if (videoRef.current && videoRef.current.buffered.length > 0) {
                const endOfBuffer = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
                const livePosition = videoRef.current.duration;
                const delay = livePosition - endOfBuffer;
                setDelayed(delay > 10);
            }
        };

        const interval = setInterval(checkDelay, 1000); // Verifica cada segundo

        return () => {
            if (hls.current) {
                hls.current.destroy();
            }
            clearInterval(interval);
        };
    }, [src]);

    return (
        <div className="relative w-full">
            {isPlaying ? (
                <video ref={videoRef} controls className="w-full aspect-video" />
            ) : (
                <div className="w-full aspect-video bg-gray-200 flex justify-center items-center">
                    <p className="text-lg text-gray-500">Stream no disponible. Verifique la conexión.</p>
                </div>
            )}
            <button
                onClick={() => videoRef.current && videoRef.current.play()}
                className={`absolute top-10 right-2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer ${isDelayed ? 'bg-transparent text-red-500' : 'bg-red-500 text-white'}`}
                title="Go to live"
            >
                LIVE
            </button>
        </div>
    );
}

export default VideoPlayer;
