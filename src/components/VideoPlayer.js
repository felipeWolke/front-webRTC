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

            // No hay necesidad de llamar a play() aquí; dejamos que el usuario inicie la reproducción mediante el control del video

            hls.on(Hls.Events.LEVEL_LOADED, function(event, data) {
                if (data.details.live) {
                    // Este evento se puede utilizar para manipular la posición de reproducción si es necesario
                }
            });
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
        <video ref={videoRef} controls className="w-full aspect-video" />
    );
}

export default VideoPlayer;
