import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadingSurvey from '@assets/lottie/loadingSurvey.json';
import Lottie from 'lottie-react';

type OXQuizProps = {
  question: string;
  onYes: () => void;
  onNo: () => void;
  currentQuestionIndex: number;
};

const QuizContainer = styled.div`
  background-color: #E1EFF6;
  border-radius: 16px; /* 20% 줄이기 */
  box-shadow: 0 3.2px 6.4px rgba(0, 0, 0, 0.1); /* 20% 줄이기 */
  padding: 24px; /* 20% 줄이기 */
  text-align: center;
  max-width: 320px; /* 20% 줄이기 */
  margin: auto;
  margin-top: 32px; /* 20% 줄이기 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 528px; /* 20% 줄이기 */
  width: 320px; /* 20% 줄이기 */
`;

const QuestionImage = styled.img`
  width: 80px; /* 20% 줄이기 */
  height: auto;
  margin-bottom: 12.8px; /* 20% 줄이기 */
`;

const QuestionText = styled.p`
  font-size: 16px; /* 20% 줄이기 */
  color: #333;
  margin-bottom: 12.8px; /* 20% 줄이기 */
  padding: 0.8px; /* 20% 줄이기 */
  padding-top: 9.6px; /* 20% 줄이기 */
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 224px; /* 20% 줄이기 */
  margin: 0;
`;

const QuizImage = styled.img`
  width: 100%;
  max-width: 216px; /* 20% 줄이기 */
  margin: 16px auto 0; /* 20% 줄이기 */
  border-radius: 8px; /* 20% 줄이기 */
  box-shadow: 0 1.6px 3.2px rgba(0, 0, 0, 0.1); /* 20% 줄이기 */
`;

const Button = styled.button`
  padding: 9.6px 19.2px; /* 20% 줄이기 */
  border: none;
  border-radius: 24px; /* 20% 줄이기 */
  font-size: 16px; /* 20% 줄이기 */
  margin: 0 8px; /* 20% 줄이기 */
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
  margin-top: 16px; /* 20% 줄이기 */
`;

const OXQuiz: React.FC<OXQuizProps> = ({ question, onYes, onNo, currentQuestionIndex }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const questionImagePath = `/assets/images/survey/Q${currentQuestionIndex + 1}.png`;
  const quizImagePath = `/assets/images/survey/quiz${currentQuestionIndex + 1}.png`;

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = questionImagePath;
    img.onload = () => setImageLoaded(true);
  }, [questionImagePath]);

  return (
    <QuizContainer>
      {imageLoaded ? (
        <>
          <QuestionImage src={questionImagePath} alt={`Question Image ${currentQuestionIndex + 1}`} />
          <QuestionText>{question}</QuestionText>
          <QuizImage src={quizImagePath} alt={`Quiz Image ${currentQuestionIndex + 1}`} />
          <ButtonContainer>
            <Button onClick={onYes}>O</Button>
            <Button onClick={onNo}>X</Button>
          </ButtonContainer>
        </>
      ) : (
        <Lottie animationData={loadingSurvey} loop={true} autoplay={true} />
      )}
    </QuizContainer>
  );
};

export default OXQuiz;
