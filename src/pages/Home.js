import Joystick from "../components/Jostick";  // Asegúrate de que la ruta y el nombre sean correctos
import JoystickAbsolute from "../components/JoystickAbsolute";
import VideoPlayer from "../components/VideoPlayer";

function Home() {
    const cameraRoute = process.env.REACT_APP_CAMERA_ROUTE;

    return (
        <div className='w-full h-auto flex items-center justify-center bg-gray-100 p-6 sm:p-10'>
            <div className="w-full max-w-3xl">
                <div>
                    <VideoPlayer className="bg-white rounded-lg shadow-md overflow-hidden" src={`${cameraRoute}/hlsDataRut956_1/stream.m3u8`} />
                </div>
            </div>
        </div>

    );
}

export default Home;
