import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const AppRouter = () => {
  const [open_login, isLoginOpen] = useState<boolean>(false);
  const [open_register, isRegisterOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    setUsername(storedUsername || '');
  }, []);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {!username && (
          <LazyLogin open={open_login} isOpen={isLoginOpen} onUsernameChange={handleUsernameChange} isRegisterOpen={isRegisterOpen} />
        )}
        {!username && (
          <LazyRegister open={open_register} isOpen={isRegisterOpen} onUsernameChange={handleUsernameChange} isLoginOpen={isLoginOpen} />
        )}
      </Suspense>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            {username ? (
              <LazyMainPage username={username} setUsername={handleUsernameChange} />
            ) : (
              <LazyMainPage username={username} isLoginOpen={isLoginOpen} />
            )}
          </Suspense>
        } />
        <Route path="/create" element={
          <Suspense fallback={<div>Loading...</div>}>
            {username ? (
              <LazyCreatePage username={username} setUsername={handleUsernameChange} />
            ) : (
              <LazyCreatePage username={username} isLoginOpen={isLoginOpen} />
            )}
          </Suspense>
        } />
        <Route path="/test/:test_id" element={
          <Suspense fallback={<div>Loading...</div>}>
            {username ? (
              <LazyStartTestPage username={username} setUsername={handleUsernameChange} />
            ) : (
              <LazyStartTestPage username={username} isLoginOpen={isLoginOpen} />
            )}
          </Suspense>
        } />
        <Route path="/tests/:tests_id" element={
          <Suspense fallback={<div>Loading...</div>}>
            {username ? (
              <LazyTestsPage username={username} setUsername={handleUsernameChange} />
            ) : (
              <LazyTestsPage username={username} isLoginOpen={isLoginOpen} />
            )}
          </Suspense>
        } />
        <Route path="/profile" element={
          <Suspense fallback={<div>Loading...</div>}>
            {username ? (
              <LazyProfilePage username={username} setUsername={handleUsernameChange} />
            ) : (
              <LazyProfilePage username={username} isLoginOpen={isLoginOpen} />
            )}
          </Suspense>
        } />
      </Routes>
    </Router>
  );
};

const LazyMainPage = lazy(() => import('./pages/MainPage'));
const LazyCreatePage = lazy(() => import('./pages/CreatePage'));
const LazyLogin = lazy(() => import('./components/Dialogs/Login/Login'));
const LazyRegister = lazy(() => import('./components/Dialogs/Register/Register'));
const LazyStartTestPage = lazy(() => import('./pages/StartTestPage'));
const LazyTestsPage = lazy(() => import('./pages/TestsPage'));
const LazyProfilePage = lazy(() => import('./pages/ProfilePage'));

export default AppRouter;