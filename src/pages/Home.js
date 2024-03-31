
import Joystick from "../components/Jostick";
import VideoPlayer from "../components/VideoPlayer";


function Home (){
    const cameraRoute = process.env.REACT_APP_CAMERA_ROUTE;

    return (
        <div className='min-h-screen min-w-full p-6 sm:p-10 bg-gray-100'>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <VideoPlayer src={`${cameraRoute}/hlsData/stream.m3u8`} />
                    <Joystick numberCamera={1}></Joystick>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <VideoPlayer src="/hlsData2/stream.m3u8" />
                    <Joystick numberCamera={2}></Joystick>
                </div>
            </div>
        </div>
      );

}

export default Home;