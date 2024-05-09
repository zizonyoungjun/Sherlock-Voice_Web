import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const ResultText = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 20px;
`;

const SurveyResult = () => {
  const [searchParams] = useSearchParams();
  const yesCount = searchParams.get('yes') ?? '0'; // 'null' 일 경우 '0'으로 대체
  const noCount = searchParams.get('no') ?? '0'; // 'null' 일 경우 '0'으로 대체

  const totalQuestions = 8;
  const yesPercentage = (parseInt(yesCount) / totalQuestions) * 100;

  return (
    <ResultContainer>
      <Header/>
      <ResultText>설문 결과: {yesCount}/{totalQuestions}</ResultText>
      <ResultText>위험도: {yesPercentage.toFixed(2)}%</ResultText>
      <Footer/>
    </ResultContainer>
  );
};

export default SurveyResult;
