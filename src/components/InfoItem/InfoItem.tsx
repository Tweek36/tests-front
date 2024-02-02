import React, { useState } from 'react';
import './InfoItem.css'
import { ReactComponent as ArrowSvg } from '../../local/svg/arrow.svg';
import { ReactComponent as CloseSvg } from '../../local/svg/close.svg';
import { getWinLoss } from '../../api';

interface InfoItemProps {
    index: number;
    videoId: string;
    title: string;
    place: number;
    onClickVideo: (e: React.MouseEvent<HTMLImageElement, MouseEvent>, videoId: string) => void;
}

const InfoItem: React.FC<InfoItemProps> = ({ index, videoId, title, onClickVideo }) => {
    return (
        <div className='info-item'>
            <h3 className="info-item-index__text">{index}.</h3>
            <img className='info-item-image' src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="" onClick={(e)=>onClickVideo(e, videoId)} />
            <p className="info-item-title">{title}</p>
        </div>
    )
}

export default InfoItem;