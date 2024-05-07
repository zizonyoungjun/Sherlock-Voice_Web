import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import LoadingLottie from '/Users/youngjunhan/Desktop/24-1/종설/Sherlock_Voice/Sherlock_Voice-Web/public/assets/lottie/LoadingLottie.json';
import Header from '../../components/Header';



const Container = styled.div`
  width: 300px;
  margin: 50px auto;
  text-align: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
  background-color: #fff; 
`;

const LoadingAnimation = styled(Lottie)`
  width: 300px;
  height: 300px;
`;

const LoadingText = styled.div`
  margin-top: 60px;
  font-size: 24px;
  color: #333;
  line-height: 36px;
`;

const Loading = () => {
    return (
    <Container>
        <Header/>
        <PageContainer>
        <LoadingAnimation animationData={LoadingLottie} loop={true} />
        <LoadingText>녹음 파일을 분석 중입니다.<br/>잠시만 기다려주세요...</LoadingText>
      </PageContainer>
    </Container>
    );
  };
  
  export default Loading;
  