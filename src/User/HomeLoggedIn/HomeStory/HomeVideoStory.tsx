import React from "react";

class HomeVideoStory extends React.Component {
  render() {
    return (
      <>
        <div className="title lg:mb-72 pb-5 flex justify-center items-center">
          <video width="100%" height="500" autoPlay loop muted className="video-player ">
            <source
              src="https://videos.pexels.com/video-files/4723077/4723077-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </>
    );
  }
}

export default HomeVideoStory;
