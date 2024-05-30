import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IconOkay from '/public/assets/images/icons/iconOkay.png';
import IconConcerned from '/public/assets/images/icons/IconConcerned.png';
import IconDanger from '/public/assets/images/icons/iconDanger.png';
import Manual from '../voice/manual';

interface CircleProps {
  score: number;
}

interface GaugeImageProps extends React.SVGProps<SVGImageElement> {
  iconPath: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96%;
  min-height: 100vh;
  padding: 16px;
  padding-bottom: 150px;
`;

const InnerContainer = styled.div`
  border: 3px solid #fff;
  border-radius: 16px;
  padding: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
        <InnerContainer>
          <ScoreTextContainer>
            <DescriptionText>설문 결과: </DescriptionText>
            <HighlightText>{yesCount}/{totalQuestions}</HighlightText>
          </ScoreTextContainer>
          <Gauge viewBox="-8 -6 48 48">
            <CircleBg cx="18" cy="18" r="16" />
            <AnimatedCircle cx="18" cy="18" r="16" score={yesCount} />
            <GaugeImage href={iconPath} iconPath={iconPath} />
          </Gauge>
          <AlertMessage color={messageColor}>{alertMessage}</AlertMessage>
        </InnerContainer>
      </ResultContainer>
      <Manual/>
      <Footer />
    </Container>
  );
};

export default SurveyResult;
