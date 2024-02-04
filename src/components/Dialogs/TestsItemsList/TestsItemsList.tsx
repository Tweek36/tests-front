import React from 'react';
import Dialog from '../Dialog/Dialog';
import './TestsItemsList.css';


interface TestsItemsListProps {
    open: boolean;
    isOpen: (state: boolean) => void;
    items: { videoId: string, title: string }[];
    setVideoId: (videoId: string) => void;
    isVideoOpen: (b: boolean) => void;
    hidden: boolean;
}

const TestsItemsList: React.FC<TestsItemsListProps> = ({ open, isOpen, items, setVideoId, isVideoOpen, hidden }) => {
    return (
        <Dialog open={open} isOpen={isOpen} className={"tests-items-list" + (hidden ? (' hidden') : (''))}>
            <div className="tests-items-list-content">
                {items.map((value, index) => {
                    return (
                        <div className="tests-items-list-item">
                            <p className="tests-items-list-item__index">{index + 1}.</p>
                            <img src={`https://img.youtube.com/vi/${value.videoId}/maxresdefault.jpg`} onClick={(e)=>{e.preventDefault(); setVideoId(value.videoId); isVideoOpen(true)}} className="tests-items-list-item__video" alt="" />
                            <p className="tests-items-list-item__title">{value.title}</p>
                        </div>
                    )
                })}
            </div>
        </Dialog>
    );
}

export default TestsItemsList;