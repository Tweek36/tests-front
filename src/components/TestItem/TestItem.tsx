import React, { useState, useEffect } from 'react';
import './TestItem.css'

interface TestItemProps {
    title: string;
    image: string;
    category: string;
    test_id: number;
    onClick: (test_id: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const TestItem: React.FC<TestItemProps> = ({ title, image, category, test_id, onClick }) => {
    return (
        <div className="test-item" onClick={(e) => { onClick(test_id, e) }}>
            <div className="test-item-content">
                <h3>{title}</h3>
                <img className='test-item__image' src={"http://127.0.0.1:8000/image/" + image} alt="" />
                <p>{category}</p>
            </div>
        </div>
    )
}

export default TestItem;