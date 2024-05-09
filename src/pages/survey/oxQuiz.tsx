import React from 'react';
import styled from 'styled-components';

type OXQuizProps = {
  question: string;
  onYes: () => void;
  onNo: () => void;
  currentQuestionIndex: number;  // 현재 질문 인덱스를 나타내는 새로운 prop 추가
};

const QuizContainer = styled.div`
  background-color: #E1EFF6;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 30px;
  text-align: center;
  max-width: 350px;
  margin: auto;
  margin-top: 80px;
`;

const QuestionText = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 24px;
  padding: 1px;
  padding-top: 12px;
  line-height: 28px;
  white-space: pre-wrap;
`;

const QuizImage = styled.img`
  width: 270px;
  margin: 20px auto;
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
  transition: background-color 0.3s;
  &:first-child {
    background-color: #007BFF;
  }
  &:last-child {
    background-color: #DC3545;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const OXQuiz: React.FC<OXQuizProps> = ({ question, onYes, onNo, currentQuestionIndex }) => {
  const imagePath = `/assets/images/survey/quiz${currentQuestionIndex + 1}.png`; // 이미지 경로 동적 생성

  return (
    <QuizContainer>
      <QuestionText>{question}</QuestionText>
      <QuizImage src={imagePath} alt={`Quiz Image ${currentQuestionIndex + 1}`} />
      <ButtonContainer>
        <Button onClick={onYes}>O</Button>
        <Button onClick={onNo}>X</Button>
      </ButtonContainer>
    </QuizContainer>
  );
};

export default OXQuiz;
