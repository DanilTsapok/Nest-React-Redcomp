import React from "react";
import video from "../../../../assets/video3.mp4";
function BeforeFooter() {
  return (
    <div>
      <video src={video} loop autoPlay muted width={"100%"}></video>
    </div>
  );
}

export default BeforeFooter;
