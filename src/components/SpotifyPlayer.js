import React from "react";

const SpotifyPlayer = ({ trackUrl }) => {
  return (
    <div className="w-full h-24">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackUrl}?autoplay=true`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        title="Spotify Player"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
