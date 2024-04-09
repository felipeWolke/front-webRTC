import Joystick from "../components/Jostick";
import VideoPlayer from "../components/VideoPlayer";


function Home3 (){
    const cameraRoute = process.env.REACT_APP_CAMERA_ROUTE;

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-6 sm:p-10'>
            <div className="w-full max-w-3xl">
                <div >
                    <VideoPlayer className="bg-white rounded-lg shadow-md overflow-hidden" src={`${cameraRoute}/hlsDataRut956_3/stream.m3u8`} />
                    <div className=" mt-12 bg-gray-100">
                    <Joystick numberCamera={2}></Joystick>
                    </div>
                </div>
            </div>
        </div>
      );

}

export default Home3;