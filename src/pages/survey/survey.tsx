import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OXQuiz from './oxQuiz'; // OXQuiz 컴포넌트의 경로 확인 필요
import Header from '../../components/Header'; // Header 컴포넌트의 경로 확인 필요
import styled from 'styled-components';
import Footer from '../../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
`;

const questions = [
    "인터넷뱅킹 중 추가인증이 필요하다며\nQR코드를 이용한 앱설치를 \n요구했나요?",
    "대출 또는 추심에 대한 내용이 담긴\nURL 문자를 받으셨나요?",
    "추심 담당자 \n혹은 소속 직원이라 말하는 사람이 \n직접 만나서 현금을 전달할 것을 \n요구했나요?",
    "채용을 이유로 \n계좌 비밀번호 등을 요구했나요?",
    "정부기관이라며 \n자금이체를 요구했나요?",
    "낮은 금리의 대출을 위해 \n높은 금리의 대출을 우선 진행하라고\n설명 받으셨나요?",
    "금융감독원의 이름으로 \n금융거래정보를 요구하였나요?",
    "한도와 필요 서류가 없는 \n대출을 제시하였나요?"
  ];

const Survey: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const navigate = useNavigate(); // 네비게이트 훅 사용


  const handleYes = () => {
    setYesCount(yesCount + 1);
    moveToNextQuestion();
  };

  const handleNo = () => {
    setNoCount(noCount + 1);
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate(`/SurveyResult?yes=${yesCount + 1}&no=${noCount}`);
    }
  };

  return (
    <Container>
      <Header/>
      <OXQuiz
        question={questions[currentQuestionIndex]}
        onYes={handleYes}
        onNo={handleNo}
        currentQuestionIndex={currentQuestionIndex}
      />
      <Footer/>
    </Container>
  );
};

export default Survey;
