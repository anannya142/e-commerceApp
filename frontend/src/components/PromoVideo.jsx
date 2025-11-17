import React from "react";

const PromoVideo = ({ src, className }) => {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls
      className={className || "w-full h-auto mt-10"}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default PromoVideo;
