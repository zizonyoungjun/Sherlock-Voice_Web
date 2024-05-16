import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IconOkay from '/public/assets/images/icons/iconOkay.png';
import IconConcerned from '/public/assets/images/icons/IconConcerned.png';
import IconDanger from '/public/assets/images/icons/iconDanger.png';

interface CircleProps {
  score: number;
}

interface GaugeImageProps extends React.SVGProps<SVGImageElement> {
  iconPath: string; // 커스텀 프로퍼티 추가
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  padding-bottom: 150px;
`;

const ScoreTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px 20px; // 충분한 패딩을 추가
  border-radius: 10px; // 둥근 모서리
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center; // 텍스트 중앙 정렬
`;

const HighlightText = styled.span`
  font-size: 2.5rem;
  font-weight: bolder;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  color: #4FC3F7;
  font-weight: 800;
`;

const DescriptionText = styled.span`
  color: black;
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 10px;
  font-size: 24px;

`;

const Gauge = styled.svg`
  width: 100%;
  height: auto;
  transform: rotate(-90deg);
  position: relative;
`;


const GaugeImage = styled.image.attrs<GaugeImageProps>(props => ({
  width: props.iconPath === IconDanger ? '18px' : '20px',
  x: props.iconPath === IconDanger ? '33' : '32',
  y: props.iconPath === IconDanger ? '33' : '32'
}))`
  height: auto;
  transform: translate(-50%, -50%);
`;

const CircleBg = styled.circle.attrs(() => ({
  cx: "18",
  cy: "18",
  r: "16"
}))`
  fill: none;
  stroke: #eee;
  stroke-width: 10;
`;

const Circle = styled.circle.attrs<CircleProps>(props => ({
  cx: "18",
  cy: "18",
  r: "16"
}))<CircleProps>`
  fill: none;
  stroke: #6200ea;
  stroke-width: 10;
`;

const Title = styled.h1`
  color: navy;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const Step = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-left: 5px solid navy;
  margin-bottom: 10px;
`;

const StepTitle = styled.h2`
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const StepDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 0;
  line-height: 1.5;
  a {
    color: #007BFF;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResultContainer = styled.div`
  background-color: #FFF6D5;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 30px;
  text-align: center;
  max-width: 380px;
  width: 100%;
  margin: 20px auto;
  margin-top: 100px;
`;

const ManualContainer = styled.div`
  background-color: #FFF6D5;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 30px;
  text-align: center;
  max-width: 380px;
  width: 100%;
  margin: 20px auto;
`;

const AlertMessage = styled.p<{ color: string }>`
  color: ${props => props.color};
  margin-top: 20px;
  font-size: 2rem;
  font-weight: bold;
  white-space: pre-wrap;
  line-height: 28px;
  background-color: white;
  padding: 15px 15px; // 충분한 패딩을 추가
  border-radius: 10px; // 둥근 모서리
  text-align: center; // 텍스트 중앙 정렬
`;

const percentage = (score: number, maxScore: number): number => (score / maxScore) * 100;

const scoreToColor = (score: number): string => {
  if (score <= 2) {
    return "#33C642"; // 진한 초록색
  } else if (score <= 5) {
    return "#ffc107"; // 중간색
  } else {
    return "#d32f2f"; // 진한 빨간색
  }
};

const createAnimation = (score: number) => keyframes`
  0% { 
    stroke-dasharray: 0 100;
    stroke: #33C642;
  }
  100% { 
    stroke-dasharray: ${percentage(score, 8)} 100;
    stroke: ${scoreToColor(score)};
  }
`;

const AnimatedCircle = styled(Circle)<CircleProps>`
  stroke: ${props => scoreToColor(props.score)};
  animation: ${props => css`${createAnimation(props.score)} 1.5s ease-out forwards`};
`;

const SurveyResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const yesCountString = searchParams.get('yes') ?? '0'; // 'null' 일 경우 '0'으로 대체
  const yesCount = parseInt(yesCountString, 10); // 10진법 숫자로 파싱

  const totalQuestions = 8;

  let alertMessage = "";
  let messageColor = "#2e7d32";
  let iconPath;

  if (yesCount <= 2) {
    alertMessage = `보이스피싱 위험도가 낮습니다\n그러나 항상 주의하세요.`;
    messageColor = "#2e7d32";
    iconPath = IconOkay;
  } else if (yesCount <= 5) {
    alertMessage = `보이스피싱 위험도가 중간입니다.\n관련 지식을 업데이트 하고 주의하세요.`;
    messageColor = "#ffc107";
    iconPath = IconConcerned;
  } else {
    alertMessage = `보이스피싱 위험도가 높습니다.\n즉시 아래 메뉴얼을 따라주세요.`;
    messageColor = "#d32f2f";
    iconPath = IconDanger;
  }

  return (
    <Container>
      <Header />
      <ResultContainer>
        <ScoreTextContainer>
          <DescriptionText>설문 결과: </DescriptionText>
          <HighlightText>{yesCount}/{totalQuestions}</HighlightText>
        </ScoreTextContainer>        <Gauge viewBox="-8 -6 48 48">
          <CircleBg cx="18" cy="18" r="16" />
          <AnimatedCircle cx="18" cy="18" r="16" score={yesCount} />
          <GaugeImage href={iconPath} iconPath={iconPath} />
        </Gauge>
        <AlertMessage color={messageColor}>{alertMessage}</AlertMessage>
      </ResultContainer>
      <ManualContainer>
        <Title>보이스피싱 대응 메뉴얼</Title>
        <Step>
          <StepTitle>1. 계좌 지급정지 신청하기</StepTitle>
          <StepDescription>경찰청 112 혹은 금감원 1332에 전화하여 피해 신고와 계좌 지급정지를 신청하세요.</StepDescription>
        </Step>
        <Step>
          <StepTitle>2. 악성앱 설치 대응</StepTitle>
          <StepDescription>의심스러운 URL을 통한 악성앱 설치가 의심될 경우, 악성앱을 삭제하고 해당 휴대전화를 비행기모드로 전환하세요.</StepDescription>
        </Step>
        <Step>
          <StepTitle>3. 명의도용 휴대전화 <br/>개설 조회 및 조치</StepTitle>
          <StepDescription>
            한국정보통신진흥협회 <a href="http://www.msafer.or.kr" target="_blank" rel="noopener noreferrer">명의도용방지 서비스</a>에 접속하여 본인 명의로 개설된 휴대전화를 확인하고, 필요한 조치를 취하세요.
          </StepDescription>        
        </Step>
        <Step>
          <StepTitle>4. 피해 구제 신청 절차</StepTitle>
          <StepDescription>경찰서에 방문하여 피해 구제 신청을 서면으로 접수하세요.</StepDescription>
        </Step>
      </ManualContainer>
      <Footer />
    </Container>
  );
};

export default SurveyResult;
