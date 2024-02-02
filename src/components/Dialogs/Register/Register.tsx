import React, { useState } from 'react';
import Dialog from '../Dialog/Dialog';
import { login, register } from '../../../api';
import { ReactComponent as CloseIcon } from '../../../local/svg/close.svg';
import InputWithIcon from '../Dialog/InputWithIcon/InputWithIcon';
import { ReactComponent as UsernameIcon } from '../../../local/svg/login.svg';
import { ReactComponent as PasswordIcon } from '../../../local/svg/password.svg';
import { ReactComponent as MailIcon } from '../../../local/svg/mail.svg';


interface RegisterProps {
    open: boolean;
    isOpen: (state: boolean) => void;
    onUsernameChange: (newUsername: string) => void;
    isLoginOpen: (state: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ open, isOpen, onUsernameChange, isLoginOpen }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repeat_password: '',
        email: '',
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
            const response = await register(formData);

            console.log('Register successful', response);
            onUsernameChange(response.data.username);

        } catch (error) {
            console.error('Register failed', error);
        }
    };

    return (
        <Dialog onSubmit={handleSubmit} open={open} isOpen={isOpen} className="register">
            <button type="button" onClick={() => isOpen(false)} className='close'><CloseIcon /></button>
            <h1>Регистрация</h1>
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
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    icon={<MailIcon />}
                    name='email'
                />
                <InputWithIcon 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    icon={<PasswordIcon />}
                    name='password'
                />
                <InputWithIcon 
                    type="password" 
                    placeholder="Repeat password" 
                    value={formData.repeat_password} 
                    onChange={handleChange} 
                    icon={<PasswordIcon />}
                    name='repeat_password'
                />
            </div>
            <div className="form-buttons">
                <button className='form-button' type="submit">Submit</button>
            </div>
            <div className="form-questions">
                <a>Забыли пароль?</a>
                <a onClick={() => {isLoginOpen(true); isOpen(false)}}>У меня есть аккаунт</a>
            </div>
        </Dialog>
    );
}


export default React.memo(Register);