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
    const formData = JSON.parse(localStorage.getItem('fileToUpload') || '{}');
    if (!formData) {
      console.error('No file to upload found in localStorage');
      return;
    }

    const uploadFile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/upload/`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.task_id) {
          localStorage.removeItem('fileToUpload');
          localStorage.setItem('task_id', data.task_id);
          checkStatus(data.task_id);
        } else {
          console.error('Failed to get task_id from response');
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    };

    const checkStatus = async (task_id: string) => {
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
        } else {
          setTimeout(() => checkStatus(task_id), 2000);
        }
      } catch (error) {
        console.error('Error checking status:', error);
        setTimeout(() => checkStatus(task_id), 2000);
      }
    };

    uploadFile();
  }, [navigate]);

  return (
    <Container>
      <Header />
      <PageContainer>
        <LoadingAnimation animationData={LoadingLottie} loop={true} />
        <LoadingText>녹음 파일을 분석 중입니다.<br />잠시만 기다려주세요...</LoadingText>
      </PageContainer>
      <Footer />
    </Container>
  );
};

export default Loading;
