import Joystick from "../components/Jostick";
import VideoPlayer from "../components/VideoPlayer";
import JoystickAbsolute from "../components/JoystickAbsolute";

function Home3 (){
    const cameraRoute = process.env.REACT_APP_CAMERA_ROUTE;

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-white'>
            <VideoPlayer src={`${cameraRoute}/hlsDataRut956_3/stream.m3u8`} />
        </div>
    );

}

export default Home3;