//CreatePage.tsx
import React, { useState, ChangeEvent, useEffect } from 'react';
import './CreatePage.css'
import ListItem from '../components/ListItem/ListItem';
import { createTest, getYouTubeTitle, getItemsList, getTestById, updateTest, addItemsList, updateItemsList, deleteItemsList, addPlaylist } from '../api';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as SaveIcon } from '../local/svg/save.svg';
import Video from '../components/Dialogs/Video/Video';


interface CreatePageProps {
    username: string;
    isLoginOpen?: (state: boolean) => void;
    setUsername?: (username: string) => void;
}

const CreatePage: React.FC<CreatePageProps> = ({ username, isLoginOpen, setUsername }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const test_id = queryParams.get('test_id')
    const navigate = useNavigate();
    const [lastId, setLastId] = useState(0);
    const [items, setItems] = useState<{ [key: number]: { url: string, videoId: string, title: string, description: string, test_item_id: number | undefined } }>({ 0: { url: "", videoId: "", title: "", description: "", test_item_id: undefined } });
    const [test_title, setTestTitle] = useState('');
    const [test_description, setTestDescription] = useState('');
    const [test_category, setTestCategory] = useState('');
    const [test_image, setTestImage] = useState<File>();
    const [request_sended, setRequestSended] = useState(false)
    const [id, setTestId] = useState(test_id ? Number(test_id) : undefined)
    const [loaded, setLoaded] = useState(false)
    const [test_image_name, setTestImagName] = useState('')
    const [test_update_data, setTestUpdateData] = useState<{ title: string | undefined, description: string | undefined, category: string | undefined, image: File | undefined, published: boolean | undefined }>({ title: undefined, description: undefined, category: undefined, image: undefined, published: undefined })
    const [items_to_update, setItemsToUpdate] = useState<{ [key: number]: { videoId: string | undefined, title: string | undefined, description: string | undefined } } | {}>({});
    const [items_to_add, setItemsToAdd] = useState<{ [key: number]: { videoId: string | undefined, title: string | undefined, description: string | undefined } } | {}>({});
    const [items_to_delete, setItemsToDelete] = useState<number[]>([])
    const [saving, setSaving] = useState(false)
    const [clickCount, setClickCount] = useState(0);
    const [playlist_id, setPlaylistId] = useState('')
    const [video_open, isVideoOpen] = useState(false)
    const [cur_videoId, setCurVideoId] = useState('')

    const addToList = (data: { id: number, videoId: string, title: string, description: string }[]) => {
        setItems(() => {
            const updatedItems = { ...items };
            let last_index = 0
            data.forEach((item: { id: number, videoId: string, title: string, description: string }, index) => {
                const { id, videoId, title, description } = item;
                updatedItems[index + lastId] = {
                    url: videoId,
                    videoId,
                    title,
                    description,
                    test_item_id: id,
                };
                last_index = index + 1
            })
            if (last_index + lastId) {
                updatedItems[lastId + last_index] = { url: "", videoId: "", title: "", description: "", test_item_id: undefined }
                setLastId(lastId + last_index)
            }
            return updatedItems;
        })
    }

    const getTest = async () => {
        if (id) {
            const test_response = await getTestById(id);
            setTestTitle(test_response.data.title)
            setTestDescription(test_response.data.description)
            setTestCategory(test_response.data.category)
            setTestImagName(test_response.data.image)
            const items_response = await getItemsList(id);
            addToList(items_response.data)
            setLoaded(true)
        }
    }

    const updateTestData = async () => {
        if (id && (test_update_data.category || test_update_data.description || test_update_data.image || test_update_data.published || test_update_data.title)) {
            setSaving(true)
            updateTest(id, test_update_data.title, test_update_data.description, test_update_data.category, test_update_data.image, test_update_data.published)
            setTestUpdateData({ title: undefined, description: undefined, category: undefined, image: undefined, published: undefined })
        }
    }

    const addTestItems = async () => {
        if (id && Object.keys(items_to_add).length) {
            setSaving(true)
            addItemsList(id, items_to_add)
            setItemsToAdd({})
        }
    }

    const updateTestItems = async () => {
        if (id && Object.keys(items_to_update).length) {
            setSaving(true)
            updateItemsList(id, items_to_update)
            setItemsToUpdate({})
        }
    }

    const deleteTestItems = async () => {
        if (id && items_to_delete.length) {
            setSaving(true)
            deleteItemsList(id, items_to_delete)
            setItemsToDelete([])
        }
    }

    const saveUpdates = async () => {
        setClickCount((prevCount) => prevCount + 1)
        const bruh = new Promise((resolve) => { setTimeout(() => { resolve("F") }, 1000) });
        const updateResult = updateTestData()
        const addResult = addTestItems()
        const updateItemsResult = updateTestItems()
        const deleteItemsResult = deleteTestItems()
        await Promise.all([updateResult, addResult, updateItemsResult, deleteItemsResult, bruh]);
        setSaving(false)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setClickCount(0);
        }, 1000);

        return () => clearTimeout(timer);
    }, [clickCount]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            saveUpdates()
        }, 2000);

        return () => clearInterval(intervalId);
    }, [test_update_data, items_to_add, items_to_update, items_to_delete]);

    useEffect(() => {
        getTest()
    }, []);

    useEffect(() => {
        if (!video_open) {
            setCurVideoId('')
        }
    }, [video_open])


    const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setTestTitle(title)
        setTestUpdateData({ ...test_update_data, title })

    }

    const onChangeDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const description = e.target.value
        setTestDescription(description)
        setTestUpdateData({ ...test_update_data, description })
    }

    const onChangeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const category = e.target.value
        setTestCategory(category)
        setTestUpdateData({ ...test_update_data, category })
    }

    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0].type.startsWith('image/')) {
            const image = e.target.files[0]
            setTestImage(image)
            setTestUpdateData({ ...test_update_data, image })
        }
    }

    const createNewTest = async () => {
        if (!id) {
            setRequestSended(true)
            try {
                const test = await createTest(test_title, test_description, test_category, test_image);
                navigate('/create?test_id=' + test.data.id)
                setTestId(test.data.id)
                setLoaded(true)
            } finally {
                setRequestSended(false)
            }
        }
    }

    const onUrlChangeHandler = async (id: number, e: ChangeEvent<HTMLInputElement>) => {
        const videoId = extractVideoId(e.target.value);
        const url = videoId ? videoId : e.target.value;
        const video_title = videoId.length === 11 ? (await getYouTubeTitle(videoId)).data.video_title : '';
        const title = video_title ? video_title : items[id].title;
        const test_item_id = items[id].test_item_id
        const newItems = { ...items, [id]: { "url": url, "videoId": videoId, "title": title, "description": items[id].description, "test_item_id": test_item_id } }
        if (test_item_id === undefined && !(id < lastId && !url)) {
            setItemsToAdd({ ...items_to_add, [id]: { "videoId": videoId, "title": title, "description": items[id].description } })
        } else if (test_item_id !== undefined && !(id < lastId && !url)) {
            setItemsToUpdate({ ...items_to_update, [test_item_id]: { "videoId": videoId, "title": title, "description": items[id].description } })
        }
        if (id === lastId && url) {
            setLastId(lastId + 1);
            newItems[lastId + 1] = { "url": "", "videoId": "", "title": "", "description": "", "test_item_id": undefined };
        } else if (id < lastId && !url) {
            if (test_item_id === undefined) {
                setItemsToAdd((prevItems) => {
                    const { [id]: _, ...updatedItems } = { ...prevItems };
                    return updatedItems;
                });
            } else {
                setItemsToDelete([...items_to_delete, test_item_id])
                setItemsToUpdate((prevItems) => {
                    const { [test_item_id]: _, ...updatedItems } = { ...prevItems };
                    return updatedItems;
                });
            }
            delete newItems[id];
        }
        setItems({ ...newItems });
    };

    const onTitleChangeHandler = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setItems({ ...items, [id]: { "url": items[id].url, "videoId": items[id].videoId, "title": title, "description": items[id].description, "test_item_id": items[id].test_item_id } });
    }

    const onDescriptionChangeHandler = (id: number, e: ChangeEvent<HTMLTextAreaElement>) => {
        const description = e.target.value;
        setItems({ ...items, [id]: { "url": items[id].url, "videoId": items[id].videoId, "title": items[id].title, "description": description, "test_item_id": items[id].test_item_id } });
    }

    const onChangePlaylistHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const playlist_id = extractPlaylistId(value)
        setPlaylistId(playlist_id || value)

    }

    const onClickAddPlaylistHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (playlist_id && id) {
            const playlist: {
                videoId: string,
                title: string,
                id: number,
                test_id: number,
                description: string
            }[] = (await addPlaylist(id, playlist_id)).data
            addToList(playlist)
            setPlaylistId('')
        }
    }

    const onClickImage = (videoId: string, e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault()
        setCurVideoId(videoId)
        isVideoOpen(true)
    }

    const onClickPublish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setTestUpdateData((prevData) => {
            return { ...prevData, published: true}
        })
        updateTestData()
    }

    return (
        <div className='create page'>
            <Video open={video_open} isOpen={isVideoOpen} videoId={cur_videoId} />
            <Header username={username} isLoginOpen={isLoginOpen} setUsername={setUsername} />
            <div className="save">
                <button className={'save-button' + (saving ? ' saving' : '')} disabled={saving} onClick={() => saveUpdates()}>
                    <SaveIcon />
                </button>
                {clickCount > 3 && <label>{clickCount}</label>}
            </div>
            {lastId > 0 && (
                <div className="publish">
                    <button className="publish-button" onClick={onClickPublish}>Опубликовать</button>
                </div>
            )}
            <form className="create-form">
                <h1>Создать тест</h1>
                <hr />
                <div className="main-information">
                    <div className="main-information-left">
                        <Input
                            type="text"
                            placeholder="Название"
                            name='title' required={true}
                            onChange={onChangeTitleHandler}
                            value={test_title}
                            maxLength={50}
                        />
                        <Input
                            maxLength={200}
                            isTextarea={true}
                            placeholder="Описание"
                            name='description'
                            required={true}
                            onChangeTextarea={onChangeDescriptionHandler}
                            value={test_description}
                        />
                        <Input
                            type="text"
                            placeholder="Категория"
                            name='category'
                            required={true}
                            onChange={onChangeCategoryHandler}
                            value={test_category}
                        />
                        <Input
                            type="file"
                            placeholder="Картинка"
                            name='image'
                            required={true}
                            onChange={onChangeImageHandler}
                            accept="image/*"
                        />
                    </div>
                    <div className="main-information-right">
                        {(test_image || test_image_name) && <img src={test_image ? URL.createObjectURL(test_image) : "http://127.0.0.1:8000/image/" + test_image_name} alt="" />}
                    </div>
                </div>

                {test_title && test_category && id && loaded && (
                    <div className="add-from-playlist">
                        <h2>Добавить видео из плейлиста</h2>
                        <hr />
                        <div className="add-from-playlist__wrapper">
                            {playlist_id && (
                                <iframe
                                    src={`https://www.youtube.com/embed/videoseries?list=${playlist_id}`}
                                />
                            )}
                            <Input
                                maxLength={100}
                                type="text"
                                placeholder="URL плейлиста"
                                name='playlist_id'
                                required={false}
                                value={playlist_id}
                                onChange={onChangePlaylistHandler}
                            />
                            {playlist_id && (<button onClick={onClickAddPlaylistHandler}>Добавить</button>)}
                        </div>
                        <hr />
                    </div>
                )}

                {(test_title && test_category) ? id ? loaded ? (
                    <div className="list">
                        {
                            Object.entries(items).map((arr) => {
                                return <ListItem
                                    key={Number(arr[0])}
                                    id={Number(arr[0])}
                                    url={arr[1].url}
                                    videoId={arr[1].videoId}
                                    title={arr[1].title}
                                    description={arr[1].description}
                                    test_item_id={arr[1].test_item_id}
                                    onUrlChange={onUrlChangeHandler}
                                    onTitleChange={onTitleChangeHandler}
                                    onDescriptionChange={onDescriptionChangeHandler}
                                    onClickImage={onClickImage}
                                />
                            })
                        }
                    </div>
                ) : (
                    <div className="waiting">Подгружаем...</div>
                ) : (
                    request_sended ? (
                        <div className="waiting">Ждём...</div>
                    ) : (
                        <button onClick={() => createNewTest()}>Создать тест</button>
                    )
                ) : (
                    <div className="no-main-informaition">
                        <p>Необходимо заполнить все обязательные поля</p>
                    </div>
                )}
            </form>
            <Footer />
        </div>
    );
};

function extractVideoId(url: string): string {
    if (!url) {
        return '';
    }
    if (url.length === 11 && url.match(/^[a-zA-Z0-9_-]{11}$/)) {
        return url;
    }
    const urlWithoutQuery = url.split('?')[0];

    if (urlWithoutQuery.includes('youtu.be')) {
        return urlWithoutQuery.substr(urlWithoutQuery.lastIndexOf('/') + 1);
    }

    if (urlWithoutQuery.includes('youtube.com/embed/')) {
        return urlWithoutQuery.substr(urlWithoutQuery.lastIndexOf('/') + 1);
    }

    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1].split('?')[0] : '';
}

function extractPlaylistId(url: string): string {
    const regex = /(?:list=)([a-zA-Z0-9_-]{34})/;

    const match = url.match(regex);

    return match ? match[1] : '';
}

export default React.memo(CreatePage);
