"use client"

function WatchVideoPage({params} : any) {
  const videoId = params.videoId;

  return (
    <div>
      <video
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${videoId}`}
        width="800px"
        height="auto"
        controls
        autoPlay
        id="video-player"
      />
    </div>
  );
}

export default WatchVideoPage;