import React from 'react';
import { Button, Message } from '..';

interface ErrorPageProps {
  message: string
  title: string
  buttonTitle: string
  onClick?: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message, title, buttonTitle, onClick }) => {
  return(
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-lg">
      <h3 className="mb-5 text-gray-800 text-2xl">{title}</h3>
      <Message show className="mb-10">
        {message}
      </Message>
      <div className="flex justify-center">
        <Button onClick={onClick && onClick}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;