import React, { useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import LoadingLottie from '/Users/youngjunhan/Desktop/24-1/종설/Sherlock_Voice/Sherlock_Voice-Web/public/assets/lottie/LoadingLottie.json';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
  margin-top: 180px;
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
    const navigate = useNavigate();

    // 서버 데이터 로딩 시뮬레이션 및 결과 페이지로 네비게이트
    useEffect(() => {
        // 여기에 서버 요청 로직을 추가하고, 완료되면 네비게이트 실행
        const timer = setTimeout(() => {
            navigate('/voiceResult');  // 데이터 로딩 후 결과 페이지로 이동
        }, 3000);  // 3초 후에 네비게이트

        return () => clearTimeout(timer);  // 컴포넌트 언마운트 시 타이머 제거
    }, [navigate]);

    return (
        <Container>
            <Header/>
            <PageContainer>
                <LoadingAnimation animationData={LoadingLottie} loop={true} />
                <LoadingText>녹음 파일을 분석 중입니다.<br/>잠시만 기다려주세요...</LoadingText>
            </PageContainer>
            <Footer/>
        </Container>
    );
};

export default Loading;
