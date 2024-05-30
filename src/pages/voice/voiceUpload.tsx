import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import LogoDetective from '/assets/images/logo/LogoDetective.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PageContainer = styled.div`
  background-color: #fff;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  width: 90%;
`;

const MainContent = styled.div`
  margin-top: -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const UploadBox = styled.div`
  background-color: #E1EFF6;
  color: #000;
  border-radius: 20px;
  padding: 16px;
  padding-bottom: 36px;
  text-align: center;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  border: 3px solid #fff;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoText = styled.div`
  margin-top: 24px;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
  color: #002D4E;
`;

const Button = styled.button`
  background-color: #002D4E;
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 16px;
  font-weight: bold;
  width: 80%;
  cursor: pointer;
  opacity: ${(props: { disabled?: boolean }) => props.disabled ? 0.5 : 1};
  pointer-events: ${(props: { disabled?: boolean }) => props.disabled ? 'none' : 'auto'};
  margin-top: 32px;
`;

const Upload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setFileUploaded(true);
      console.log('File selected:', files[0].name);
    }
  };

  const handleButtonClick = () => {
    if (fileUploaded && file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`${API_BASE_URL}/upload/`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully');
        localStorage.setItem('task_id', data.task_id); // task_id를 localStorage에 저장
        navigate('/loading');
      })
      .catch(error => {
        console.error('Upload error:', error);
      });
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <Container>
      <Header />
      <UploadBox>
        <InnerContainer>
          <InfoText>의심되는 통화 녹음 파일을 업로드하여<br />보이스 피싱 위험도와 대응법을<br />간편히 확인해보세요 !</InfoText>
          <div>
            <img src={LogoDetective} style={{ width: '300px', height: 'auto' }} />
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/*"
            />
            <Button 
              onClick={handleButtonClick}
              style={{
                backgroundColor: fileUploaded ? '#28a745' : '#002D4E'
              }}
            >
              {fileUploaded ? '분석 시작하기' : '녹음 파일 올리기'}
            </Button>
          </div>
        </InnerContainer>
      </UploadBox>
      <Footer />
    </Container>
  );
};

const VoiceUpload = () => {
  return (
    <PageContainer>
      <MainContent>
        <Upload />
      </MainContent>
    </PageContainer>
  );
};

export default VoiceUpload;
