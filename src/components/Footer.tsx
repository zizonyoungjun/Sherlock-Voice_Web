import React from 'react';
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
  padding: 10px 20px;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img` 
  width: 48px;
  height: auto;
  margin-bottom: 3px;
`;

const CentralButton = styled.button` 
  background-color: #E1EFF6;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
  position: relative;
  top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 15px;
`;

const IconLabel = styled.div`
  color: #fff;
  font-size: 12px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <IconWrapper>
                <Link to="/">
                    <Icon src={voiceIcon} alt="Voice" />
                </Link>
                <IconLabel>녹음 분석</IconLabel>
            </IconWrapper>
            <CentralButton as="a" href="/">
                <Icon src={homeIcon} alt="home" style={{ width: '90%', height: 'auto' }}/>
            </CentralButton>
            <IconWrapper>
                <Link to="/survey">
                    <Icon src={quizIcon} alt="survey" />
                </Link>
                <IconLabel>점검 설문</IconLabel>
            </IconWrapper>
        </FooterContainer>
    );
};

export default Footer;
