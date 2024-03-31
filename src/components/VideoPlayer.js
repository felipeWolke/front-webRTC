import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function VideoPlayer({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            // Quitar el play automático para respetar la política de interacción del usuario
            // hls.on(Hls.Events.MANIFEST_PARSED, function() {
            //     videoRef.current.play();
            // });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            // Quitar el play automático para respetar la política de interacción del usuario
            // videoRef.current.play();
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
            className="w-full aspect-video"  // El video mantiene su aspecto y ocupa el ancho completo del contenedor
        />
    );
}

export default VideoPlayer;
