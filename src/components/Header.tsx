import React from 'react';
import styled from 'styled-components';
import logoHeader from '/assets/images/logo/LogoHeader.png';

const StyledHeader = styled.header`
  background-color: #FFFFFF;
  width: 100%;
  padding: 32px;
  padding-top: 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #E0E0E0;
`;

const Header = () => {
  return (
    <StyledHeader>
      <img src={logoHeader} alt="Logo" />
    </StyledHeader>
  );
};

export default Header;
