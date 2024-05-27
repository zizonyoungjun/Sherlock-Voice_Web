import styled from 'styled-components';
import { Link } from 'react-router-dom';
import voiceIcon from '/assets/images/icons/material-symbols_voice.png';
import homeIcon from '/assets/images/icons/material-symbols_home.png';
import quizIcon from '/assets/images/icons/material-symbols_quiz.png';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: #000;
  padding: 5px 20px; /* 높이 줄이기 위해 padding 조정 */
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  max-width: 430px;
  height: 60px; /* 전체 높이 조정 */
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 32px; /* 아이콘 크기 줄이기 */
  height: auto;
  margin-bottom: 3px;
`;

const CentralButton = styled.a`
  background-color: #E1EFF6;
  border-radius: 50%;
  width: 60px; /* 중앙 버튼 크기 줄이기 */
  height: 60px;
  border: 2px solid #ccc;
  position: relative;
  top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px; /* 패딩 줄이기 */
`;

const IconLabel = styled.div`
  color: #fff;
  font-size: 10px; /* 글꼴 크기 줄이기 */
`;

const Footer = () => {
    return (
        <FooterContainer>
            <IconWrapper>
                <Link to="/voiceUpload">
                    <Icon src={voiceIcon} alt="Voice" />
                </Link>
                <IconLabel>녹음 분석</IconLabel>
            </IconWrapper>
            <CentralButton href="/">
                <Icon src={homeIcon} alt="home" style={{ width: '90%', height: 'auto' }} />
            </CentralButton>
            <IconWrapper>
                <Link to="/survey">
                    <Icon src={quizIcon} alt="survey" />
                </Link>
                <IconLabel>설문 점검</IconLabel>
            </IconWrapper>
        </FooterContainer>
    );
};

export default Footer;
