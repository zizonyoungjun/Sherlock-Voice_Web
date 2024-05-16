import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
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

interface CreditScoreProps {
  score: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  padding-top: 0px;
  padding-bottom: 150px;
`;

const ScoreTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white; // 텍스트 색상을 흰색으로
  padding: 0px 40px; // 충분한 패딩을 추가
  border-radius: 10px; // 둥근 모서리
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center; // 텍스트 중앙 정렬
`;

const DescriptionText = styled.span`
  color: #333; // 좀 더 진한 색상
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 24px;
`;

const ScoreText = styled.div`
  font-size: 2.5rem;
  font-weight: bolder;
  background-color: white;
  padding: 20px 40px;
  border-radius: 50%;
  color: #10439F;
  font-weight: 800;
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
  max-width: 450px;
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
  max-width: 450px;
  width: 100%;
  margin: 20px auto;
`;

const AlertMessage = styled.p<{ color: string }>`
  color: ${props => props.color};
  font-size: 2rem;
  margin: 10px;
  margin-top: 0px;
  font-weight: bold;
  white-space: pre-wrap;
  line-height: 28px;
`;

const KeywordListContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
`;

const KeywordTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const KeywordList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const KeywordItem = styled.li<{ index: number }>`
  background-color: #4B0082;
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #4B0082;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0; // 초기에는 보이지 않도록 설정
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${props => 1.5 + props.index * 0.5}s;

  &:hover {
    background-color: white;
    color: #4B0082;
    border-color: #4B0082;
  }
`;

const percentage = (score: number, maxScore: number): number => (score / maxScore) * 100;

const scoreToColor = (score: number): string => {
  if (score < 40) {
    return "#33C642"; // 진한 초록색
  } else if (score < 50) {
    const transitionProgress = (score - 30) / 20; // 30점에서 50점 사이의 진행률을 계산
    const red = Math.round(255); // 노랑의 빨강 구성 요소는 항상 255
    const green = Math.round(193 + (62 * (1 - transitionProgress))); // 193에서 255로 증가
    const blue = Math.round(7 * (1 - transitionProgress)); // 7에서 0으로 감소
    return `rgb(${red}, ${green}, ${blue})`;
  } else {
    const transitionProgress = (score - 50) / 50; // 50점에서 100점 사이의 진행률을 계산
    const green = Math.round(193 * (1 - transitionProgress)); // 노랑에서 빨강으로: 초록이 193에서 0으로 감소
    return `rgb(255, ${green}, 0)`;
  }
};

const createAnimation = (score: number) => keyframes`
  0% { 
    stroke-dasharray: 0 100;
    stroke: #33C642;
  }
  100% { 
    stroke-dasharray: ${percentage(score, 100)} 100;
    stroke: ${scoreToColor(score)};
  }
`;

const AnimatedCircle = styled(Circle)<CircleProps>`
  stroke: ${props => scoreToColor(props.score)};
  animation: ${props => css`${createAnimation(props.score)} 1.5s ease-out forwards`};
`;

const CreditScore: React.FC<CreditScoreProps> = ({ score }) => {
  const { taskId } = useParams<{ taskId: string }>();
  const numericTaskId = parseInt(taskId ?? '0', 10);
  const [keywords, setKeywords] = useState<string[]>(['검찰청', '계좌', '만나서']);
  const [displayedScore, setDisplayedScore] = useState<number>(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/result/${numericTaskId}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.keywords && data.keywords.length > 0) {
        setKeywords(data.keywords);
      }
    })
    .catch(error => {
      console.error('Error fetching keywords:', error);
    });
  }, [numericTaskId]);

  useEffect(() => {
    let start = 0;
    const end = score;
    if (start === end) return;

    const duration = 1500; // 애니메이션 지속 시간 (밀리초)
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    const timer = setInterval(() => {
      start += increment;
      setDisplayedScore(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [score]);

  let alertMessage = "";
  let messageColor = "#2e7d32";
  let iconPath;

  if (score < 40) {
    alertMessage = `보이스피싱 위험도가 낮습니다.\n그러나 항상 주의하세요.`;
    iconPath = IconOkay;
  } else if (score <= 70) {
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
          <DescriptionText>보이스피싱 위험도</DescriptionText>
          <ScoreText>{displayedScore}%</ScoreText>
        </ScoreTextContainer>
        <Gauge viewBox="-8 -6 48 48">
          <CircleBg cx="18" cy="18" r="16" />
          <AnimatedCircle cx="18" cy="18" r="16" score={score} />
          <GaugeImage href={iconPath} iconPath={iconPath} />
        </Gauge>
        <AlertMessage color={messageColor}>{alertMessage}</AlertMessage>
        {keywords.length > 0 && (
          <KeywordListContainer>
            <KeywordTitle>🚨 감지된 위험 키워드 🚨</KeywordTitle>
            <KeywordList>
              {keywords.map((keyword: string, index: number) => (
                <KeywordItem key={index} index={index}>{keyword}</KeywordItem>
              ))}
            </KeywordList>
          </KeywordListContainer>
        )}
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

const VoiceResult: React.FC = () => {
  return (
    <div>
      <CreditScore score={83} />
    </div>
  );
};

export default VoiceResult;
