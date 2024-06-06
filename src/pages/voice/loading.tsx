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
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const task_id = localStorage.getItem('task_id');
    console.log(task_id)
    if (!task_id) {
      console.error('No task_id found in localStorage');
      return;
    }

    const checkStatus = async (startTime: number) => {
      try {
        const response = await fetch(`${API_BASE_URL}/waiting/${task_id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        if (data.status === 'ready') {
          navigate(`/voiceResult/${task_id}`);
        } else if (Date.now() - startTime < 60000) { // 1분 타임아웃
          setTimeout(() => checkStatus(startTime), 2000); // 2초 후에 다시 상태 확인
        } else {
          console.error('Request timed out.');
          setStatus('timeout'); // 타임아웃 상태로 설정
        }
      } catch (error) {
        console.error('Error checking status:', error);
        if (Date.now() - startTime < 60000) { // 1분 타임아웃
          setTimeout(() => checkStatus(startTime), 2000); // 오류 발생 시 2초 후에 다시 시도
        } else {
          console.error('Request timed out.');
          setStatus('timeout'); // 타임아웃 상태로 설정
        }
      }
    };

    checkStatus(Date.now()); // 컴포넌트 마운트 시 작업 상태 확인 시작
  }, [navigate]);

  return (
    <Container>
      <Header />
      <PageContainer>
        <LoadingAnimation animationData={LoadingLottie} loop={true} />
        <LoadingText>
          {status === 'processing'
            ? '녹음 파일을 분석 중입니다.\n잠시만 기다려주세요...'
            : '요청 시간이 초과되었습니다.\n다시 시도해 주세요.'}
        </LoadingText>
      </PageContainer>
      <Footer />
    </Container>
  );
};

export default Loading;
