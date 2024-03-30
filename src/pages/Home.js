
import VideoPlayer from "../components/VideoPlayer";


function Home (){

    return (
        <div className='min-h-screen min-w-full p-6 sm:p-10 bg-gray-100'>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <VideoPlayer src="/hlsData/stream.m3u8" />
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <VideoPlayer src="/hlsData2/stream.m3u8" />
                </div>
            </div>
        </div>
      );

}

export default Home;