import React, { useState } from 'react';
import Dialog from '../Dialog/Dialog';
import { login } from '../../../api';
import './Login.css';
import { ReactComponent as CloseIcon } from '../../../local/svg/close.svg';
import InputWithIcon from '../Dialog/InputWithIcon/InputWithIcon';
import { ReactComponent as UsernameIcon } from '../../../local/svg/login.svg';
import { ReactComponent as PasswordIcon } from '../../../local/svg/password.svg';


interface LoginProps {
    open: boolean;
    isOpen: (state: boolean) => void;
    onUsernameChange: (newUsername: string) => void;
    isRegisterOpen: (state: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ open, isOpen, onUsernameChange, isRegisterOpen }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login(formData);
            onUsernameChange(response.data.username);

        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Dialog onSubmit={handleSubmit} open={open} isOpen={isOpen} className="login">
            <button type="button" onClick={() => isOpen(false)} className='close'><CloseIcon /></button>
            <h1>Вход</h1>
            <div className='form-inputs'>
                <InputWithIcon 
                    type="text" 
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    icon={<UsernameIcon />}
                    name='username'
                />
                <InputWithIcon 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    icon={<PasswordIcon />}
                    name='password'
                />
            </div>
            <div className="form-buttons">
                <button className='form-button' type="submit">Submit</button>
            </div>
            <div className="form-questions">
                <a>Забыли пароль?</a>
                <a onClick={() => {isRegisterOpen(true); isOpen(false)}}>Зарагестривроаться</a>
            </div>
        </Dialog>
    );
}

export default React.memo(Login);