import React from 'react';
import styled from 'styled-components';
import logoHeader from '/assets/images/logo/LogoHeader.png';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: #fff;
  padding: 32px 0;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const Header = () => {
  return (
    <StyledHeader>
      <img src={logoHeader} alt="Logo" />
    </StyledHeader>
  );
};

export default Header;
