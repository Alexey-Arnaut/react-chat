import React from 'react';

export const AuthFormWrapper: React.FC = ({ children }) => {
    return (
        <form className='auth-form'>
            <div className="auth-form-wrapper">
                {children}
            </div>
        </form>
    );
};