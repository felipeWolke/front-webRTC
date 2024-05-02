import React from 'react';
import VideoPlayer from '../components/VideoPlayer';

function Secondary() {
    const cameraRoute = process.env.REACT_APP_CAMERA_ROUTE;

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-white '>
            <VideoPlayer src={`${cameraRoute}/hlsDataRut956_1_secondary/stream.m3u8`} />
        </div>
    );
}

export default Secondary;
