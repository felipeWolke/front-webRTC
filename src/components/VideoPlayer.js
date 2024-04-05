import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function VideoPlayer({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls({
                startLevel: -1, // permite que hls.js decida el nivel inicial automáticamente
                capLevelToPlayerSize: true // limita la calidad del video al tamaño del reproductor
            });

            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            className="w-full aspect-video" // El video mantiene su aspecto y ocupa el ancho completo del contenedor
        />
    );
}

export default VideoPlayer;
