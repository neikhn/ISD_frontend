import React from "react";

class Parallax extends React.Component {
  render() {
    return (
      <>
        <div
          className="product-parallax-section bg-[url(https://4kwallpapers.com/images/walls/thumbs_3t/548.jpg)]
                            bg-cover bg-no-repeat bg-center h-[400px] md:h-[500px] bg-fixed w-[100vw] relative left-[calc(-50vw+50%)]"
        ></div>
      </>
    );
  }
}

export default Parallax;
