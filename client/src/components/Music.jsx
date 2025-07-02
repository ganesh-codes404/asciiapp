// import React, { useState } from 'react';
// import './Music.css';

// export default function Music() {
//   const [tracks, setTracks] = useState([]);
//   const [currentTrack, setCurrentTrack] = useState(null);

//   const handleFolderUpload = (e) => {
//     const files = Array.from(e.target.files).filter(file =>
//       file.type.startsWith('audio/')
//     );

//     if (files.length === 0) {
//       alert("No audio files found!");
//       return;
//     }

//     setTracks(files);
//     setCurrentTrack(files[0]);
//   };

//   const playTrack = (track) => {
//     setCurrentTrack(track);
//   };

//   return (
//     <div className="music-container">
//   <h2 className="music-title">Music Player</h2>

//   <input
//     type="file"
//     className="music-upload"
//     webkitdirectory="true"
//     multiple
//     accept="audio/*"
//     onChange={handleFolderUpload}
//   />
//   <div class="boxContainer">
//   <div class="box box1"></div>
//   <div class="box box2"></div>
//   <div class="box box3"></div>
//   <div class="box box4"></div>
//   <div class="box box5"></div>
// </div>
//   {tracks.length > 0 && (
//     <ul className="track-list">
//       {tracks.map((track, idx) => (
//         <li key={idx} className="track-item">
//           <button onClick={() => playTrack(track)} className="track-button">
//             {track.name}
//           </button>
//         </li>
//       ))}
//     </ul>
//   )}

//   {currentTrack && (
//     <div className="now-playing">
//       <h4>Now Playing: {currentTrack.name}</h4>
//       <audio src={URL.createObjectURL(currentTrack)} controls autoPlay />
//     </div>
//   )}
// </div>
//   )
// }
import React from 'react';
import './Music.css';

export default function Music({ tracks, setTracks, setCurrentTrack, currentTrack }) {

  const handleFolderUpload = (e) => {
    const files = Array.from(e.target.files).filter(file =>
      file.type.startsWith('audio/')
    );

    if (files.length === 0) {
      alert("No audio files found!");
      return;
    }

    setTracks(files);
    if (!currentTrack) setCurrentTrack(files[0]); // Auto-play first only if nothing is playing
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="music-container">
      <h2 className="music-title">Music Player</h2>

      <input
        type="file"
        className="music-upload"
        webkitdirectory="true"
        multiple
        accept="audio/*"
        onChange={handleFolderUpload}
      />

      {tracks.length > 0 && (
        <ul className="track-list">
          {tracks.map((track, idx) => (
            <li key={idx} className="track-item">
              <button onClick={() => playTrack(track)} className="track-button">
                {track.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

