import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lottie from 'lottie-react';
import thiefLottie from '@assets/lottie/thiefLottie.json';
import Manual from './manual';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 16px;
  padding-top: 0px;
  padding-bottom: 150px;
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

const InnerContainer = styled.div`
  border: 3px solid #fff;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);

`;

const AlertMessage = styled.p`
  color: #d32f2f;
  font-size: 2rem;
  margin: 10px;
  margin-top: 0px;
  font-weight: bold;
  white-space: pre-wrap;
  line-height: 28px;
`;

const InstructionMessage = styled.p`
  font-size: 1.7rem;
  margin: 9px;
  margin-top: 0px;
  font-weight: bold;
  white-space: pre-wrap;
  line-height: 25.2px;
`;

const LottieContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FakeVoice: React.FC = () => {
  return (
    <Container>
      <Header />
      <ResultContainer>
        <InnerContainer>
          <LottieContainer>
            <Lottie animationData={thiefLottie} loop={true} />
          </LottieContainer>
          <AlertMessage>🚨 보이스피싱 위험도가 높은 합성 음성 파일입니다. 🚨</AlertMessage>
          <InstructionMessage>
            {'\n'}혹시 보이스피싱 피해가 의심된다면
            {'\n'}즉시 아래 메뉴얼을 따라주세요 !
          </InstructionMessage>
        </InnerContainer>
      </ResultContainer>
      <Manual />
      <Footer />
    </Container>
  );
};

export default FakeVoice;
