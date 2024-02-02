// ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import './ProfilePage.css'
import Footer from '../components/Footer/Footer';
import { getFinishedList, getMyList, getTestsList, getUnfinishedList } from '../api';
import { useNavigate } from 'react-router-dom';


interface ProfilePageProps {
    username: string;
    isLoginOpen?: (state: boolean) => void;
    setUsername?: (username: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username, isLoginOpen, setUsername }) => {
    const [profile_list_type, setProfileListType] = useState<'my' | 'finished' | 'unfinished'>('my')
    const [my_list, setMyList] = useState<{ id: number, title: string, image: string }[]>([])
    const [finished_list, setFinishedList] = useState<{ id: number, title: string, image: string, last_update: string }[]>([])
    const [unfinished_list, setUnfinishedList] = useState<{ id: number, title: string, image: string, last_update: string }[]>([])
    const [my_list_loading, setMyListLoading] = useState(false)
    const [finished_list_loading, setFinishedListLoading] = useState(false)
    const [unfinished_list_loading, setUnfinishedListLoading] = useState(false)
    const navigate = useNavigate();

    const load_my_list = async () => {
        if (!my_list_loading) {
            setMyListLoading(true)
            try {                
                const data = (await getMyList()).data
                setMyList(data)
                
            } finally {
                setMyListLoading(false)
            }
        }
    }

    const load_finished_list = async () => {
        if (!finished_list_loading) {
            setFinishedListLoading(true)
            try {
                const data = (await getFinishedList()).data
                setFinishedList(data)
            } finally {
                setFinishedListLoading(false)
            }
        }
    }

    const load_unfinished_list = async () => {
        if (!unfinished_list_loading) {
            setUnfinishedListLoading(true)
            try {
                const data = (await getUnfinishedList()).data
                setUnfinishedList(data)
            } finally {
                setUnfinishedListLoading(false)
            }
        }
    }
    useEffect(()=>{
        console.log(my_list_loading);
    }, [my_list_loading])
    useEffect(() => {
        switch (profile_list_type) {
            case 'my':
                load_my_list();
                break;

            case 'finished':
                load_finished_list();
                break;

            case 'unfinished':
                load_unfinished_list();
                break;
        }
    }, [profile_list_type])
    return (
        <div className='profile page'>
            <Header username={username} isLoginOpen={isLoginOpen} setUsername={setUsername} />
            <div className="content">
                <div className="profile-lists">
                    <div className="profile-lists__selector">
                        <button onClick={(e) => { e.preventDefault(); setProfileListType('my') }}>Ваши тесты</button>
                        <button onClick={(e) => { e.preventDefault(); setProfileListType('finished') }}>Пройденные тесты</button>
                        <button onClick={(e) => { e.preventDefault(); setProfileListType('unfinished') }}>Не пройденные тесты</button>
                    </div>
                    <div className="profile-list">
                        {profile_list_type === 'my' && (!my_list_loading ? (
                            my_list.length ? (my_list.map((value, index) => {
                                return (
                                    <div className="profile-list-item">
                                        <p className="profile-list-item__index">{index + 1}.</p>
                                        <img className='profile-list-item__image' src={"http://127.0.0.1:8000/image/" + value.image} alt="" onClick={(e) => { e.preventDefault(); navigate('/test/' + value.id) }} />
                                        <p className="profile-list-item__title">{value.title}</p>
                                    </div>
                                )
                            })
                            ) : (
                                <div className="empty">Пуста</div>
                            )
                        ) : (
                            <div className="loading">Подгружаем</div>
                        ))}
                        {profile_list_type === 'unfinished' && (!unfinished_list_loading ? (
                            unfinished_list.length ? (unfinished_list.map((value, index) => {
                                return (
                                    <div className="profile-list-item">
                                        <p className="profile-list-item__index">{index + 1}.</p>
                                        <img className='profile-list-item__image' src={"http://127.0.0.1:8000/image/" + value.image} alt="" onClick={(e) => { e.preventDefault(); navigate('/tests/' + value.id) }} />
                                        <p className="profile-list-item__title">{value.title}</p>
                                        <p className="profile-list-item__date">{value.last_update}</p>
                                    </div>
                                )
                            })
                            ) : (
                                <div className="empty">Пуста</div>
                            )
                        ) : (
                            <div className="loading">Подгружаем</div>
                        ))}
                        {profile_list_type === 'finished' && (!my_list_loading ? (
                            finished_list.length ? (finished_list.map((value, index) => {
                                return (
                                    <div className="profile-list-item">
                                        <p className="profile-list-item__index">{index + 1}.</p>
                                        <img className='profile-list-item__image' src={"http://127.0.0.1:8000/image/" + value.image} alt="" onClick={(e) => { e.preventDefault(); navigate('/tests/' + value.id) }} />
                                        <p className="profile-list-item__title">{value.title}</p>
                                        <p className="profile-list-item__date">{value.last_update}</p>
                                    </div>
                                )
                            })
                            ) : (
                                <div className="empty">Пуста</div>
                            )
                        ) : (
                            <div className="loading">Подгружаем</div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default React.memo(ProfilePage);
