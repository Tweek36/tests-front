import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestsById, makeChoice, makeReChoice, makeRefresh } from '../api';
import './TestsPage.css'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TestsItem from '../components/TestsItem/TestsItem';
import { ReactComponent as BackIcon } from '../local/svg/back.svg'
import { ReactComponent as RefreshIcon } from '../local/svg/refresh.svg'
import Video from '../components/Dialogs/Video/Video';


interface TestsPageProps {
    username: string;
    isLoginOpen?: (state: boolean) => void;
    setUsername?: (username: string) => void;
}

const TestsPage: React.FC<TestsPageProps> = ({ username, isLoginOpen, setUsername }) => {
    const { tests_id } = useParams();
    const [items, setItems] = useState<{ id: number, title: string, videoId: string }[]>()
    const [prev_items, setPrevItems] = useState<{ id: number, title: string, videoId: string }[] | null>(null)
    const [isEnded, setIsEnded] = useState(false)
    const [stage, setStage] = useState(1)
    const [round, setRound] = useState(1)
    const [all_rounds, setAllRounds] = useState(1)
    const [isInfoLoaded, setIsInfoLoaded] = useState(false)
    const [rechoice, setRechoice] = useState(false)
    const [is_refreshed, setRefreshed] = useState(false)
    const [video_open, isVideoOpen] = useState(false)
    const [cur_videoId, setCurVideoId] = useState('')
    // const navigate = useNavigate();

    useEffect(()=>{
        if (!video_open) {
            setCurVideoId('')
        }
    }, [video_open])

    const getTestsData = async () => {
        if (tests_id) {
            const data = (await getTestsById(Number(tests_id))).data
            const { ended, items } = data
            setItems(items)
            if (isEnded !== ended) {
                setIsEnded(ended)
            }
            if (!ended) {
                const { prev_items, stage, round, all_rounds, is_refreshed } = data
                setRefreshed(is_refreshed)
                setPrevItems(prev_items)
                setStage(stage)
                setRound(round)
                setAllRounds(all_rounds)
            }
            setIsInfoLoaded(true)
        }
    }
    useEffect(() => {
        getTestsData()
    }, [])

    useEffect(() => {
        console.log(prev_items);
    }, [prev_items])

    const setWinner = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, winner_id: number) => {
        const data = (await makeChoice(Number(tests_id), winner_id)).data
        if (tests_id) {
            if (data.ended) {
                setIsInfoLoaded(false)
                await getTestsData()
                setIsEnded(true)
            } else {
                const { items, prev_items } = data
                setItems(items)
                setPrevItems(prev_items)
                setRound(round + 1)
                if ('stage' in data) {
                    const { stage, all_rounds } = data
                    setStage(stage)
                    setRound(1)
                    setAllRounds(all_rounds)
                    setRefreshed(false)
                }
            }
        }
    }

    const setReWinner = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, winner_id: number) => {
        e.preventDefault()
        makeReChoice(Number(tests_id), winner_id)
        setRechoice(false)
        setRound(round + 1)
    }

    const refresh = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const data = (await makeRefresh(Number(tests_id))).data
        const { items } = data
        setItems(items)
        setRefreshed(true)
    }

    return (
        <div className="tests page">
            {isInfoLoaded && isEnded && (<Header username={username} isLoginOpen={isLoginOpen} setUsername={setUsername} />)}
            {isInfoLoaded && isEnded && (<Video open={video_open} isOpen={isVideoOpen} videoId={cur_videoId} />)}
            {isInfoLoaded ? (isEnded ? (
                <div className="ended-content">
                    <div className="tests-list">
                        {items?.map((item, index) => {
                            return (<TestsItem title={item.title} videoId={item.videoId} place={index + 1} id={item.id} tests_id={Number(tests_id)} setCurVideoId={setCurVideoId} isVideoOpen={isVideoOpen} />)
                        })}
                    </div>
                </div>
            ) : (
                <div className="content">
                    <div className="tests-info">
                        <div className="tests-info-left">
                            <p>Этап: {stage}</p>
                            <p>Раунд: {round} / {all_rounds}</p>
                        </div>
                        <div className="tests-info-right">
                            {<button className="rechoice" onClick={(e) => { e.preventDefault(); setRechoice(!rechoice); rechoice ? setRound(round + 1) : setRound(round - 1) }} disabled={prev_items === null}><BackIcon className={rechoice ? 'reflected' : undefined} />Вернуться</button>}
                            <button className="refresh" disabled={is_refreshed} onClick={refresh}><RefreshIcon />Перемешать</button>
                        </div>
                    </div>
                    <div className={"choices" + (rechoice ? " hidden" : "")}>
                        {items && items.map((item) => {
                            return (
                                <div className="choice">
                                    <div className="choice-title">
                                        <a href={"https://www.youtube.com/watch?v=" + item.videoId} className="choice-title__link">{item.title}</a>
                                    </div>
                                    <div className="choice-video">
                                        <iframe className="choice-video__iframe" src={"https://www.youtube.com/embed/" + item.videoId} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                    <button className="set-winner" onClick={(e) => { setWinner(e, item.id) }}>Выбрать</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className={"choices" + (rechoice ? "" : " hidden")}>
                        {prev_items && prev_items.map((item) => {
                            return (
                                <div className="choice">
                                    <div className="choice-title">
                                        <a href={"https://www.youtube.com/watch?v=" + item.videoId} className="choice-title__link">{item.title}</a>
                                    </div>
                                    <div className="choice-video">
                                        <iframe className="choice-video__iframe" src={"https://www.youtube.com/embed/" + item.videoId} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                    <button className="set-winner" onClick={(e) => { setReWinner(e, item.id) }}>Выбрать</button>
                                </div>
                            )
                        })}
                    </div>
                </div>)
            ) : (
                <div className="loading">Loading</div>
            )}
            {isInfoLoaded && isEnded && (<Footer />)}
        </div>
    );
};



export default TestsPage;
