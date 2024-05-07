import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import LogoDetective from '/assets/images/logo/LogoDetective.png';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

interface UploadBoxProps {
  type: 'audio';
}

const PageContainer = styled.div`
  background-color: #fff;
  color: #fff;
  min-height: 100vh;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadBox = styled.div`
  background-color: #E1EFF6;
  color: #000;
  border-radius: 16px;
  padding: 16px;
  padding-bottom: 36px;
  text-align: center;
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
  background-color: #002D4E; // 기본 색상
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
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (fileUploaded) {
      navigate('/Loading'); // 업로드가 완료된 상태에서 버튼을 클릭하면 로딩 페이지로 이동
    } else {
      fileInputRef.current?.click(); // 업로드가 완료되지 않았을 때 파일 선택창을 열어 사용자가 파일을 선택하게 함
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      console.log('Uploading:', file.name);
      setFileUploaded(true); // 파일 업로드 상태를 true로 설정
    }
  };

  return (
    <Container>
      <Header/>
      <UploadBox>
        <InfoText>의심되는 통화 녹음 파일을 업로드하여<br/>보이스 피싱 위험도와 대응법을<br/>간편히 확인해보세요 !</InfoText>
        <div>
          {type === 'audio' && (
            <img src={LogoDetective} style={{ width: '400px', height: 'auto' }}/>
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
              backgroundColor: fileUploaded ? '#28a745' : '#002D4E' // 조건에 따라 색상 변경
            }}
          >
            {fileUploaded ? '분석 시작하기' : '녹음 파일 올리기'}
          </Button>
        </div>
      </UploadBox>
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
