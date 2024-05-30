import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 150px;
`;

const Title = styled.h1`
  color: navy;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1.5px;
`;

const Step = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border-left: 5px solid navy;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const StepTitle = styled.h2`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0;
  line-height: 1.5;
  text-align: left;
  white-space: pre-wrap;
  a {
    color: #007BFF;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ManualContainer = styled.div`
  background-color: #FFF6D5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  text-align: center;
  margin: 20px auto;
  max-width: 500px;
  width: 100%;
`;

const Manual: React.FC = () => {
  return (
    <Container>
      <ManualContainer>
        <Title>보이스피싱 대응 메뉴얼</Title>
        <Step>
          <StepTitle>안녕하세요, 사용자의 안전을 위한 보이스피싱 대응 메뉴얼입니다. 보이스피싱이 의심될 때, 아래의 단계를 차근차근 따라주세요.</StepTitle>
        </Step>
        <Step>
          <StepTitle>1. 즉시 전화하기</StepTitle>
          <StepDescription>
            182번 또는 1588-1188번으로 전화를 걸어주세요. 이 번호는 경찰청과 금융감독원의 보이스피싱 신고 전용 번호입니다. 빠르게 대처할 수 있습니다.
          </StepDescription>
        </Step>
        <Step>
          <StepTitle>2. 보이스피싱 통합 대응센터 연결</StepTitle>
          <StepDescription>
            통합 대응센터에 연결되면, 보이스피싱 상황을 자세히 보고해 주세요. 통화 녹취본이나 받은 문자 내용을 준비하여 설명하면, 더 신속한 대응이 가능합니다. 예를 들어, “저에게 경찰서를 사칭한 전화가 와서 계좌 정보를 요구했습니다”와 같이 구체적으로 설명합니다.
          </StepDescription>
        </Step>
        <Step>
          <StepTitle>3. 금융감독원 페이지 접속</StepTitle>
          <StepDescription>
            금융감독원 웹사이트(https://www.fss.or.kr)에 접속합니다. 상단 메뉴에서 ‘보이스피싱(전기통신금융사기) 제보’ 버튼을 클릭합니다. 여기서 제공하는 안내를 따라 제보 절차를 진행해 주세요.
          </StepDescription>
        </Step>
        <Step>
          <StepTitle>4. 피해 구제 방법 참조</StepTitle>
          <StepDescription>
            실제로 금전적 피해를 입으셨다면, 다음 단계를 따릅니다: 금융감독원 웹사이트의 피해 구제 방법 안내 페이지를 참고하여 피해 신고를 합니다. 필요 시, 경찰서나 금융기관을 방문하여 피해 사실을 신고하고, 피해 금액 환급 절차를 진행합니다. 피해 접수증과 관련 서류를 준비하여 제출합니다.
          </StepDescription>
        </Step>
        <Step>
          <StepTitle>5. 피해가 없었을 경우</StepTitle>
          <StepDescription>
            금전적 피해를 입지 않았더라도 보이스피싱 시도에 대해 신고하는 것이 중요합니다. ‘아니요’ 버튼을 클릭한 후, ‘보이스피싱 정보 제보 동의’에 동의해 주세요. 개인 정보 수집 및 이용에 동의합니다.
          </StepDescription>
        </Step>
        <Step>
          <StepTitle>6. 본인 인증 및 정보 입력</StepTitle>
          <StepDescription>
            본인 인증을 완료합니다. 인증 방법은 보통 휴대폰 인증 또는 공인인증서 인증이 있습니다. 신고 유형에 따라 필요한 정보를 정확히 입력합니다. 예를 들어, 전화로 받은 내용, 발신 번호, 대화 내용 등을 상세히 입력합니다. 이 절차를 통해 보이스피싱 시도를 효과적으로 신고하고, 더 많은 사람들이 같은 피해를 입지 않도록 도울 수 있습니다. 의심스러운 상황이 발생하면 당황하지 말고 위의 절차를 따라 안전하게 대처하시기 바랍니다. 감사합니다.
          </StepDescription>
        </Step>
      </ManualContainer>
    </Container>
  );
};

export default Manual;
