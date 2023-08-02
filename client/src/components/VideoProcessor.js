import React, { useState } from 'react';
import axios from 'axios';
import { PROCESS_VIDEO } from '../utils/mutations';

function VideoProcessor() {
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState(null);

    const processVideo = () => {
        const variables = { url };
    
        axios.post('http://localhost:5000/graphql', { query: PROCESS_VIDEO, variables })
            .then(response => {
                const video = response.data.data.processVideo;
                setVideo(video.url);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
            <button onClick={processVideo}>Process Video</button>
            {video && <a href={`http://localhost:5000/download/${video}`} download>Download Video</a>}
        </div>
    );
}

export default VideoProcessor;
