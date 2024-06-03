import React from 'react';
import styled from 'styled-components';
import manual from '/assets/images/manual.png';

const ManualContainer = styled.div`
  background-color: #FFF6D5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 5px;
  text-align: center;
  margin: 20px auto;
  max-width: 500px;
  width: 100%;
  padding-top: 5px;
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

const ManualImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

const DescriptionContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 10px;
`;

const DescriptionText = styled.span`
  color: #333;
  font-size: 2rem;
  font-weight: 800;
  white-space: pre-wrap;
  line-height: 1.2;
  margin-top: 10px;
`;

const Manual: React.FC = () => {
  return (
    <ManualContainer>
      <InnerContainer>
        <DescriptionContainer>
          <DescriptionText>보이스피싱 대응메뉴얼</DescriptionText>
        </DescriptionContainer>
        <ManualImage src={manual} alt="Manual" />
      </InnerContainer>
    </ManualContainer>
  );
};

export default Manual;
