import axios from 'axios';


const API = axios.create({
    baseURL: 'http://localhost:8000'
});

export const search = async (query: string) => {
    const response = await API.get('/search/', {
        params: {
            query
        }
    });
    return response;
}

export const login = async (data: {}) => {
    const response = await API.post('/user/login/', data, { withCredentials: true });
    return response;
}

export const logout = async () => {
    const response = await API.post('/user/logout/', {}, { withCredentials: true });
    return response;
}

export const register = async (data: {}) => {
    const response = await API.post('/user/register/', data, { withCredentials: true });
    return response;
}

export const getYouTubeTitle = async (id: string) => {
    const response = await API.get('/youtube/video-title/', {
        params: {
            id
        },
        withCredentials: true
    });
    return response;
}

export const createTest = async (title: string, description: string, category: string, image: File | undefined) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    image && formData.append('image', image);
    formData.append('published', 'false');

    const response = await API.post('/test/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
    return response;
}

export const updateTest = async (test_id: number, title: string | undefined, description: string | undefined, category: string | undefined, image: File | undefined, published: boolean | undefined) => {
    const formData = new FormData();
    title && formData.append('title', title);
    description && formData.append('description', description);
    category && formData.append('category', category);
    image && formData.append('image', image);
    published && formData.append('published', published + '');


    const response = await API.patch('/test/' + test_id + '/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
    return response;
}

export const getItemsList = async (id: number) => {
    const response = await API.get('/test/' + id + '/items/', {
        withCredentials: true
    });
    return response;
}

export const addPlaylist = async (id: number, playlist_id: string) => {
    const response = await API.post('/youtube/playlist-videos/', { playlist_id, test_id: id }, {
        withCredentials: true
    });
    return response;
}

export const addItemsList = async (id: number, data: {
    [key: number]: {
        videoId: string | undefined;
        title: string | undefined;
        description: string | undefined;
    }
}) => {
    const response = await API.post('/test/' + id + '/items/', data, {
        withCredentials: true
    });
    return response;
}

export const updateItemsList = async (id: number, data: {
    [key: number]: {
        videoId: string | undefined;
        title: string | undefined;
        description: string | undefined;
    }
}) => {
    const keys = Object.keys(data).map((v) => Number(v))
    if (!keys.length) {
        return []
    }
    const response = await API.patch('/test/' + id + '/items/', data, {
        withCredentials: true
    });
    return keys;
}

export const deleteItemsList = async (id: number, data: number[]) => {
    if (data.length === 0) {
        return
    }

    const response = await API.delete('/test/' + id + '/items/', {
        data: data,
        withCredentials: true
    });
    return response;
}

export const getTestById = async (id: number) => {
    const response = await API.get('/test/' + id + '/', {
        withCredentials: true
    });
    return response;
}

export const getTestsList = async (max_per_page: number, page: number) => {
    const response = await API.get('/test/paginated-list/', {
        params: {
            max_per_page,
            page
        }
    })
    return response
}

export const startTests = async (id: number) => {
    const response = await API.post('/tests/' + id + '/start/', {}, {
        withCredentials: true
    });
    return response;
}

export const getTestsById = async (id: number) => {
    const response = await API.get('/tests/' + id + '/', {
        withCredentials: true
    });
    return response;
}

export const makeChoice = async (id: number, winner_id: number) => {
    const response = await API.post('/tests/' + id + '/choice/' + winner_id, {}, {
        withCredentials: true
    });
    return response;
}

export const makeReChoice = async (id: number, winner_id: number) => {
    const response = await API.post('/tests/' + id + '/rechoice/' + winner_id, {}, {
        withCredentials: true
    });
    return response;
}

export const getWinLoss = async (tests_id: number, item_id: number) => {
    const response = await API.get(`/tests/${tests_id}/winloss/${item_id}/`, {
        withCredentials: true
    })
    return response;
}

export const makeRefresh = async (id: number) => {
    const response = await API.post('/tests/' + id + '/refresh/', {}, {
        withCredentials: true
    });
    return response;
}

export const getMyList = async () => {
    const response = await API.get('/test/list/', {
        withCredentials: true
    })
    return response
}

export const getFinishedList = async () => {
    const response = await API.get('/tests/finished_list/', {
        withCredentials: true
    })
    return response
}

export const getUnfinishedList = async () => {
    const response = await API.get('/tests/unfinished_list/', {
        withCredentials: true
    })
    return response
}

export const getItems = async (tests_id: number) => {
    const response = await API.get(`/tests/${tests_id}/items/`, {
        withCredentials: true
    })
    return response
}
