import styled from 'styled-components';
import React from 'react';


type OXQuizProps = {
    question: string;
    onYes: () => void;
    onNo: () => void;
  };


const QuizContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 20px;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  margin: 10px;
  cursor: pointer;
  outline: none;
  color: white;
  background-color: #007BFF; /* Blue for Yes */
  &:nth-child(2) {
    background-color: #DC3545; /* Red for No */
  }
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OXQuiz: React.FC<OXQuizProps> = ({ question, onYes, onNo }) => {
    return (
      <QuizContainer>
        <QuestionText>{question}</QuestionText>
        <ButtonContainer>
          <Button onClick={onYes}>O</Button>
          <Button onClick={onNo}>X</Button>
        </ButtonContainer>
      </QuizContainer>
    );
  };
  
  export default OXQuiz;