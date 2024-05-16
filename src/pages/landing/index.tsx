import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const hoverAnimationTop = keyframes`
  from {
    background-color: #007BFF;
  }
  to {
    background-color: #0056b3;
  }
`;

const hoverAnimationBottom = keyframes`
  from {
    background-color: #28A745;
  }
  to {
    background-color: #1e7e34;
  }
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: white;
`;

const TopSection = styled(Section)`
  background-color: #007BFF;
  &:hover {
    animation: ${hoverAnimationTop} 0.5s forwards;
  }
`;

const BottomSection = styled(Section)`
  background-color: #28A745;
  &:hover {
    animation: ${hoverAnimationBottom} 0.5s forwards;
  }
`;

const TopText = styled.p`
  text-align: center;
  line-height: 1.5;
  margin: 0 20px;
  margin-top: 70px;
  font-size: 30px;
`;

const BottomText = styled.p`
  text-align: center;
  line-height: 1.5;
  margin: 0 20px;
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
