import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import LogoDetective from '/assets/images/logo/LogoDetective.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

interface UploadBoxProps {
  type: 'audio';
}

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
  margin-top: 80px;
  width: 100%; // 부모 요소에 맞춰 넓이 설정
`;

const MainContent = styled.div`
  margin-top: -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; // 부모 요소에 맞춰 넓이 설정
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
  margin-top: 10px;
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

const Upload: React.FC<UploadBoxProps> = ({ type }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);  // 파일 객체를 저장할 상태
  const [fileUploaded, setFileUploaded] = useState(false); // 파일 업로드 상태를 관리
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]); // 파일 객체 저장
      setFileUploaded(true); // 파일이 선택되었다는 상태를 true로 설정
      console.log('File selected:', files[0].name);
    }
  };

  const handleButtonClick = () => {
    if (fileUploaded && file) {
      navigate(`/loading/105020`);
      //임시 이동
      const formData = new FormData();
      formData.append('file', file);  // 파일 객체를 FormData에 추가
      
      fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.task_id) {
          console.log(data.task_id)
          navigate(`/loading/${data.task_id}`);
        }
      })
      .catch(error => {
        console.error('Upload error:', error);
      });
    } else {
      fileInputRef.current?.click();  // 파일이 선택되지 않았다면 파일 선택창을 열도록 함
    }
  };

  return (
    <Container>
      <Header />
      <UploadBox>
        <InfoText>의심되는 통화 녹음 파일을 업로드하여<br />보이스 피싱 위험도와 대응법을<br />간편히 확인해보세요 !</InfoText>
        <div>
          {type === 'audio' && (
            <img src={LogoDetective} style={{ width: '300px', height: 'auto' }} />
          )}
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
      </UploadBox>
      <Footer />
    </Container>
  );
};

const VoiceUpload = () => {
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <PageContainer>
      <MainContent>
        <Upload type="audio" />
      </MainContent>
    </PageContainer>
  );
};

export default VoiceUpload;
