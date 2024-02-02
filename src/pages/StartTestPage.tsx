import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { getTestById, startTests } from '../api';
import './StartTestPage.css'


interface StartTestPageProps {
    username: string;
    isLoginOpen?: (state: boolean) => void;
    setUsername?: (username: string) => void;
}

const StartTestPage: React.FC<StartTestPageProps> = ({ username, isLoginOpen, setUsername }) => {
    // Получите значение параметра из URL 
    const { test_id } = useParams();
    const [test_data, setTestData] = useState<{ image: string, description: string, title: string }>()
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false)

    const getTestData = async () => {
        test_id && setTestData({ ...((await getTestById(Number(test_id))).data) })
    }
    useEffect(() => {
        getTestData()
    }, [])

    const statrTest = async () => {
        setIsClicked(true)
        const tests = await startTests(Number(test_id))
        navigate('/tests/'+tests.data.tests_id)
    }
    return (
        <div className="start-test page">
            <Header username={username} isLoginOpen={isLoginOpen} setUsername={setUsername} />
            <div className="content">
                <div className="test-card">
                    <div className="test-card-image">
                        <img src={`http://127.0.0.1:8000/image/${test_data?.image}`} alt="" />
                    </div>
                    <h1 className='test-card-title' >{test_data?.title}</h1>
                    <p className="test-card-description">{test_data?.description}</p>
                    <div className="test-card-buttons">
                        <button disabled={isClicked} onClick={()=>statrTest()}>Начать тест</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};



export default StartTestPage;
