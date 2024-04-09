import Joystick from "../components/Jostick";  // Asegúrate de que la ruta y el nombre sean correctos
import VideoPlayer from "../components/VideoPlayer";

function Home() {
    const cameraRoute = process.env.REACT_APP_CAMERA_ROUTE;

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-6 sm:p-10'>
            <div className="w-full max-w-3xl">  {/* Ajusta el tamaño máximo según necesites */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <VideoPlayer src={`${cameraRoute}/hlsDataRut956_1/stream.m3u8`} />
                    <div className="mt-12">
                        <Joystick numberCamera={1} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
