import React from 'react';
import './InputWithIcon.css'


interface InputWithIconProps {
    icon: React.ReactElement;
    placeholder?: string;
    type?: string;
    value?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon, placeholder, type, value, name, onChange }) => {
    return (
        <div className="input-with-icon">
            <input type={type} placeholder={placeholder} value={value} name={name} onChange={onChange} />
            {icon}
        </div>
    )
}

export default InputWithIcon;