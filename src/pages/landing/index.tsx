import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: white;
  background-color: #333;
  &:hover {
    background-color: #555;
  }
`;

const TopSection = styled(Section)`
  background-color: #007BFF;
`;

const BottomSection = styled(Section)`
  background-color: #28A745;
`;

const TopText = styled.p`
  text-align: center;
  line-height: 1.5; // 라인 간격 조정
  margin: 0 20px; // 좌우 마진 추가
  margin-top: 70px;
  font-size: 30px;
`;

const BottomText = styled.p`
  text-align: center;
  line-height: 1.5; // 라인 간격 조정
  margin: 0 20px; // 좌우 마진 추가
  margin-bottom: 100px;
  font-size: 30px;
`;

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigateTop = () => {
    navigate('/voiceUpload');
  };

  const handleNavigateBottom = () => {
    navigate('/survey');
  };

  return (
    <PageContainer>
      <Header/>
      <TopSection onClick={handleNavigateTop}>
        <TopText>의심되는 통화의<br/>녹음 파일이 있으신가요?</TopText>
      </TopSection>
      <BottomSection onClick={handleNavigateBottom}>
        <BottomText>통화 녹음은 못했지만<br/>위험도를 확인 해보고 싶으신가요?</BottomText>
      </BottomSection>
      <Footer/>
    </PageContainer>
  );
};

export default Landing;
