import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import LoadingLottie from '../../assets/lottie/LoadingLottie.json';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/^http:\/\//i, 'https://');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background-color: #fff;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const LoadingTestAnimation = styled(Lottie)`
  width: 300px;
  height: 300px;
`;

const LoadingTestText = styled.div`
  margin-top: 60px;
  font-size: 24px;
  color: #333;
  line-height: 36px;
  white-space: pre-wrap;
`;


const LoadingTest = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/fakeVoice');
    }, 5000); // 10초 후에 /resultTest로 이동

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리
  }, [navigate]);

  return (
    <Container>
      <Header />
      <PageContainer>
        <LoadingTestAnimation animationData={LoadingLottie} loop={true} />
        <LoadingTestText>
          {status === 'processing'
            ? '녹음 파일을 분석 중입니다.\n잠시만 기다려주세요...'
            : '요청 시간이 초과되었습니다.\n다시 시도해 주세요.'}
        </LoadingTestText>
      </PageContainer>
      <Footer />
    </Container>
  );
};

export default LoadingTest;