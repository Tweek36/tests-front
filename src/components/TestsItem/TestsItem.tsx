import React, { useState } from 'react';
import './TestsItem.css'
import { ReactComponent as ArrowSvg } from '../../local/svg/arrow.svg';
import { ReactComponent as CloseSvg } from '../../local/svg/close.svg';
import { getWinLoss } from '../../api';

interface TestsItemProps {
    id: number;
    videoId: string;
    title: string;
    place: number;
    tests_id: number;
    setCurVideoId: (videoId: string) => void;
    isVideoOpen: (b: boolean) => void;
}

const TestsItem: React.FC<TestsItemProps> = ({ id, videoId, title, place, tests_id, setCurVideoId, isVideoOpen }) => {
    const [additional_info, setAdditionalInfo] = useState<{ wins: { videoId: string, title: string }[], loss: { videoId: string, title: string } | undefined }>()
    const [is_additional_info_loaded, setIsAdditionalInfoLoaded] = useState(false)
    const [is_additional_info_open, setIsAdditionalInfoOpen] = useState(false)

    const getAdditionalInfo = async () => {
        const response = await getWinLoss(tests_id, id)
        const { wins, losses } = response.data
        setAdditionalInfo({ wins, loss: losses[0] })
        setIsAdditionalInfoLoaded(true)
    }

    const onClickAdditionalInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsAdditionalInfoOpen(!is_additional_info_open)
        if (!additional_info) {
            getAdditionalInfo()
        }
    }

    return (
        <div className="tests-item">
            <div className="tests-item-content">
                <h3>{place}.</h3>
                <img className='tests-item__image' src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} onClick={() => { setCurVideoId(videoId); isVideoOpen(true) }} alt="" />
                <p>{title}</p>
                <button className='open-additional-info' onClick={onClickAdditionalInfo}>{is_additional_info_open ? (<CloseSvg />) : (<ArrowSvg />)}</button>
            </div>
            {is_additional_info_loaded ? (
                <div className={"tests-item-additional-info" + (is_additional_info_open ? ('') : (' hidden'))}>
                    {additional_info?.wins && additional_info?.wins.length > 0 && (<div>
                        <h4>Победы</h4>
                        <hr />
                        <div className="wins">
                            {additional_info?.wins.map((win, index) => {
                                return (
                                    <div className='win'>
                                        <h3 className="win-index__text">{index + 1}.</h3>
                                        <img className='win-image' src={`https://img.youtube.com/vi/${win.videoId}/maxresdefault.jpg`} onClick={() => { setCurVideoId(win.videoId); isVideoOpen(true) }} alt="" />
                                        <p className="win-title">{win.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>)}
                    {additional_info !== undefined && additional_info.loss !== undefined && (
                        <div>
                            <h4>Поражение</h4>
                            <hr />
                            <div className="loss">
                                <h3 className="loss-index">1.</h3>
                                <img className='loss-image' src={`https://img.youtube.com/vi/${additional_info.loss.videoId}/maxresdefault.jpg`} onClick={() => { additional_info.loss && setCurVideoId(additional_info.loss.videoId); isVideoOpen(true) }} alt="" />
                                <p className="loss-title">{additional_info.loss.title}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={"tests-item-additional-info" + (is_additional_info_open ? ('') : (' hidden'))}>
                    <p className="loading">Loading</p>
                </div>
            )}
        </div >
    )
}

export default TestsItem;