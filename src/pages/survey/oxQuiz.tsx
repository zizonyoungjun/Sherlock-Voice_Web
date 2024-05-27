import React from 'react';
import styled from 'styled-components';

type OXQuizProps = {
  question: string;
  onYes: () => void;
  onNo: () => void;
  currentQuestionIndex: number;
};

const QuizContainer = styled.div`
  background-color: #E1EFF6;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  max-width: 400px;
  margin: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 660px;
  width: 400px;
`;

const QuestionImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 16px;
`;

const QuestionText = styled.p`
  font-size: 20px;
  color: #333;
  margin-bottom: 16px;
  padding: 1px;
  padding-top: 12px;
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 280px;
  margin: 0;
`;

const QuizImage = styled.img`
  width: 100%;
  max-width: 270px;
  margin: 20px auto 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  font-size: 20px;
  margin: 0 10px;
  cursor: pointer;
  outline: none;
  color: white;
  transition: background-color 0.3s, transform 0.3s;

  &:first-child {
    background-color: #007BFF;
  }
  &:last-child {
    background-color: #DC3545;
  }
  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const OXQuiz: React.FC<OXQuizProps> = ({ question, onYes, onNo, currentQuestionIndex }) => {
  const questionImagePath = `/assets/images/survey/Q${currentQuestionIndex + 1}.png`;
  const quizImagePath = `/assets/images/survey/quiz${currentQuestionIndex + 1}.png`;

  return (
    <QuizContainer>
      <QuestionImage src={questionImagePath} alt={`Question Image ${currentQuestionIndex + 1}`} />
      <QuestionText>{question}</QuestionText>
      <QuizImage src={quizImagePath} alt={`Quiz Image ${currentQuestionIndex + 1}`} />
      <ButtonContainer>
        <Button onClick={onYes}>O</Button>
        <Button onClick={onNo}>X</Button>
      </ButtonContainer>
    </QuizContainer>
  );
};

export default OXQuiz;
