//ListItem.tsx
import React, { ChangeEvent, useState } from 'react';
import Input from '../Input/Input';
import './ListItem.css'


interface ListItemProps {
    id: number;
    test_item_id?: number;
    url: string;
    videoId: string;
    title: string;
    description: string;
    onUrlChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
    onTitleChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
    onDescriptionChange: (id: number, e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClickImage: (videoId: string, e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const ListItem: React.FC<ListItemProps> = ({ id, url, videoId, title, description, onUrlChange, onTitleChange, onDescriptionChange, onClickImage }) => {
    return (
        <div className="list-item" id={id + ''}>
            <div className="item-left-side">
                <Input
                    inversed={true}
                    type="text"
                    name="item_url"
                    placeholder='URL'
                    value={url}
                    onChange={(e) => onUrlChange(id, e)}
                    required={true}
                />
                {videoId && 
                <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="" onClick={(e)=>onClickImage(videoId, e)} />
                }
            </div>
            <div className="item-right-side">
                <Input
                    maxLength={50}
                    inversed={true}
                    type="text"
                    name="item_title"
                    placeholder='Название'
                    value={title}
                    onChange={(e) => onTitleChange(id, e)}
                    required={true}
                />
                <Input
                    maxLength={200}
                    inversed={true}
                    isTextarea={true}
                    type="text"
                    name="item_description"
                    placeholder='Описание'
                    value={description}
                    onChangeTextarea={(e) => onDescriptionChange(id, e)}
                    required={false}
                />
            </div>
        </div>
    )
}

export default ListItem;