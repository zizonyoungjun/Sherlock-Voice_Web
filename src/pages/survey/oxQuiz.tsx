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
  border-radius: 16px; 
  box-shadow: 0 3.2px 6.4px rgba(0, 0, 0, 0.1); 
  padding: 24px; 
  text-align: center;
  max-width: 360px; 
  margin: auto;
  margin-top: 32px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 580px;
  width: 360px; 
`;

const InnerContainer = styled.div`
  border: 3px solid #fff;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuestionImage = styled.img`
  width: 80px; 
  height: auto;
  margin-bottom: 12.8px; 
`;

const QuestionText = styled.p`
  font-size: 16px; 
  color: #333;
  margin-bottom: 12.8px; 
  padding: 0.8px; 
  padding-top: 9.6px; 
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 224px; 
  margin: 0;
`;

const QuizImage = styled.img`
  width: 100%;
  max-width: 216px; 
  margin: 16px auto 0; 
  border-radius: 8px; 
  box-shadow: 0 1.6px 3.2px rgba(0, 0, 0, 0.1); 
`;

const Button = styled.button`
  padding: 9.6px 19.2px; 
  border: none;
  border-radius: 24px; 
  font-size: 16px; 
  margin: 0 8px; 
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
  margin-top: 16px; 
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
      <InnerContainer>
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
      </InnerContainer>
    </QuizContainer>
  );
};

export default OXQuiz;
