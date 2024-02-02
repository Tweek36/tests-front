import React from 'react';
import Dialog from '../Dialog/Dialog';
import './Video.css';


interface VideoProps {
    open: boolean;
    isOpen: (state: boolean) => void;
    videoId: string;
}

const Video: React.FC<VideoProps> = ({ open, isOpen, videoId }) => {
    return (
        <Dialog open={open} isOpen={isOpen} className="video">
            {videoId && (<iframe
                className='video-iframe'
                src={`https://www.youtube.com/embed/${videoId}`}
            />)}
        </Dialog>
    );
}

export default Video;