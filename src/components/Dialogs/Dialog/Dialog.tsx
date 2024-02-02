import React, { useState } from 'react';
import './Dialog.css';

interface DialogProps {
    open: boolean;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    isOpen: (state: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

const Dialog: React.FC<DialogProps> = ({ open, onSubmit, isOpen, className, children }) => {
    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === e.currentTarget) {
            isOpen(false);
        }
    };
    return (
        <dialog open={open} onClick={handleDialogClick} className={className + '-dialog'}>
            {onSubmit ? (
                <form method="post" onSubmit={onSubmit} className={className + '-form'}>
                    {children}
                </form>
            ) : (
                children
            )}
        </dialog>
    );
}

export default Dialog;