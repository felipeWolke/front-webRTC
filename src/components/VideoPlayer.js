import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function VideoPlayer({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls({
                startLevel: -1,
                capLevelToPlayerSize: true,
                liveSyncDurationCount: 1,
                maxMaxBufferLength: 30,
            });

            hls.loadSource(src);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                videoRef.current.play();
            });

            hls.on(Hls.Events.LEVEL_LOADED, function(event, data) {
                if (data.details.live) {
                    // Busca al "borde en vivo" del stream
                    const liveSyncPosition = hls.latencyController?.computeLivePosition(data.details.totalduration, data.details);
                    videoRef.current.currentTime = liveSyncPosition - data.details.targetduration;
                }
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.currentTime = videoRef.current.duration;
            });
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
