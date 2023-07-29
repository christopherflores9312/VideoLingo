import React, { useState } from 'react';
import axios from 'axios';

function VideoProcessor() {
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState(null);

    const processVideo = () => {
        axios.post('http://localhost:5000/video/process', { url })
            .then(response => {
                setVideo(response.data.video);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
            <button onClick={processVideo}>Process Video</button>
            {video && <a href="http://localhost:5000/download" download>Download Video</a>}

        </div>
    );
}

export default VideoProcessor;
