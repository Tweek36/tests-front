//Input.tsx
import React, { useState, ChangeEvent } from 'react';
import './Input.css'

interface InputProps {
    label?: string;
    type?: string;
    name: string;
    value?: string;
    maxLength?: number;
    required?: boolean;
    placeholder?: string;
    accept?: string;
    inversed?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeTextarea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    isTextarea?: boolean
}

const Input: React.FC<InputProps> = ({ label, type, maxLength, required, name, value, placeholder, accept, isTextarea, inversed, onChange, onChangeTextarea }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
    }

    const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChangeTextarea && onChangeTextarea(e);
    }
    return (
        <div className='input-conteiner'>
            <label className='input-label'>{label || (placeholder + ":")}</label>
            <div className="input-conteiner__wrapper">
                {isTextarea ? (
                    <textarea
                        className={'input__textarea' + (inversed ? ' inversed' : '')}
                        maxLength={maxLength}
                        required={required}
                        onChange={handleChangeTextArea}
                        name={name}
                        placeholder={placeholder}
                        value={value}></textarea>
                ) : (
                    <input
                        className={'input__input' + (inversed ? ' inversed' : '')}
                        type={type}
                        maxLength={maxLength}
                        required={required}
                        onChange={handleChange}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        accept={accept}
                    />
                )
                }
                {maxLength && <span className="input-conteiner__maxlength">{value?.length} / {maxLength}</span>}
            </div>
        </div>
    )
}

export default Input;