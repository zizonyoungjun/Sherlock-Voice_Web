import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import VoiceManual from './voiceManual';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  padding-top: 0px;
  padding-bottom: 150px;
`;

const ScoreTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white; // 텍스트 색상을 흰색으로
  padding: 0px 40px; // 충분한 패딩을 추가
  border-radius: 10px; // 둥근 모서리
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center; // 텍스트 중앙 정렬
`;

const DescriptionText = styled.span`
  color: #333; // 좀 더 진한 색상
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 24px;
`;

const ScoreText = styled.div`
  font-size: 2.5rem;
  font-weight: bolder;
  background-color: white;
  padding: 20px 40px;
  border-radius: 50%;
  color: #10439F;
  font-weight: 800;
`;

const ResultContainer = styled.div`
  background-color: #FFF6D5;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 30px;
  text-align: center;
  max-width: 450px;
  width: 100%;
  margin: 20px auto;
  margin-top: 100px;
`;


const AlertMessage = styled.p<{ color: string }>`
  color: ${props => props.color};
  font-size: 2rem;
  margin: 10px;
  margin-top: 0px;
  font-weight: bold;
  white-space: pre-wrap;
  line-height: 28px;
`;

const KeywordListContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
`;

const KeywordTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const KeywordList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const KeywordItem = styled.li<{ index: number }>`
  background-color: #4B0082;
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #4B0082;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0; // 초기에는 보이지 않도록 설정
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${props => 1.5 + props.index * 0.5}s;

  &:hover {
    background-color: white;
    color: #4B0082;
    border-color: #4B0082;
  }
`;

const FakeVoice: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
  const numericTaskId = parseInt(taskId ?? '0', 10);
  const [keywords, setKeywords] = useState<string[]>(['검찰청', '계좌', '만나서']);
  const [displayedScore, setDisplayedScore] = useState<number>(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/result/${numericTaskId}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.keywords && data.keywords.length > 0) {
        setKeywords(data.keywords);
      }
    })
    .catch(error => {
      console.error('Error fetching keywords:', error);
    });
  }, [numericTaskId]);


  let alertMessage = "";
  let messageColor = "#2e7d32";

  return (
    <Container>
      <Header />
      <ResultContainer>
        <ScoreTextContainer>
          <DescriptionText>보이스피싱 위험도</DescriptionText>
          <ScoreText>{displayedScore}%</ScoreText>
        </ScoreTextContainer>
        <AlertMessage color={messageColor}>{alertMessage}</AlertMessage>
        {keywords.length > 0 && (
          <KeywordListContainer>
            <KeywordTitle>🚨 감지된 위험 키워드 🚨</KeywordTitle>
            <KeywordList>
              {keywords.map((keyword: string, index: number) => (
                <KeywordItem key={index} index={index}>{keyword}</KeywordItem>
              ))}
            </KeywordList>
          </KeywordListContainer>
        )}
      </ResultContainer>
      <VoiceManual/>
      <Footer />
    </Container>
  );
};


export default FakeVoice;
