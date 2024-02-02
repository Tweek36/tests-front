// MainPage.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import './MainPage.css'
import Footer from '../components/Footer/Footer';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import { getTestsList } from '../api';
import TestItem from '../components/TestItem/TestItem';
import { useNavigate } from 'react-router-dom';


interface MainPageProps {
  username: string;
  isLoginOpen?: (state: boolean) => void;
  setUsername?: (username: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ username, isLoginOpen, setUsername }) => {
  const [tests, setTests] = useState<{ id: number, title: string, category: string, image: string }[]>()
  const navigate = useNavigate();

  const getTests = async () => {
    const response = await getTestsList(10, 1)
    setTests(response.data.data)
  }

  useEffect(() => {
    getTests()
  }, [])

  const testItemOnClick = (test_id: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    navigate('/test/' + test_id)
  }

  return (
    <div className='main page'>
      <Header username={username} isLoginOpen={isLoginOpen} setUsername={setUsername} />
      <div className="content">
        <ScrollableContainer className='test-list'>
          {tests && tests.map((test) => {
            return <TestItem title={test.title} image={test.image} category={test.category} test_id={test.id} onClick={testItemOnClick} />
          })}
        </ScrollableContainer>
      </div>
      <Footer />
    </div>
  );
};


export default React.memo(MainPage);
