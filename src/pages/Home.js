import Joystick from "../components/Jostick";  // Asegúrate de que la ruta y el nombre sean correctos
import JoystickAbsolute from "../components/JoystickAbsolute";
import VideoPlayer from "../components/VideoPlayer";

function Home() {
    const cameraRoute = process.env.REACT_APP_CAMERA_ROUTE;

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-6 sm:p-10'>
            <div className="w-full max-w-3xl">
                <div>
                    <VideoPlayer className="bg-white rounded-lg shadow-md overflow-hidden" src={`${cameraRoute}/hlsDataRut956_1/stream.m3u8`} />
                    <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4 mt-6">
                        <div className="bg-gray-100 flex-1">
                            <Joystick numberCamera={1} />
                        </div>
                        <div className="bg-gray-100 flex-1">
                            <JoystickAbsolute numberCamera={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
