import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IconOkay from '/public/assets/images/icons/iconOkay.png';
import IconConcerned from '/public/assets/images/icons/IconConcerned.png';
import IconDanger from '/public/assets/images/icons/iconDanger.png';
import Manual from './manual';
import PhishingCategory from './phishingCategory';

interface CircleProps {
    score: number;
  }
  
  interface GaugeImageProps extends React.SVGProps<SVGImageElement> {
    iconPath: string;
  }
  
  interface CreditScoreProps {
    score: number;
  }
  
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    min-height: 90vh;
    padding: 14.4px;
    padding-top: 0px;
    padding-bottom: 135px;
    margin: 0 auto;
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
  
  const ScoreTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 0px 36px;
    border-radius: 9px;
    margin-top: 18px;
    margin-bottom: 27px;
    text-align: center;
  `;
  
  const DescriptionText = styled.span`
    color: #333;
    font-size: 1.35rem;
    font-weight: 800;
    margin-bottom: 9px;
    font-size: 21.6px;
  `;
  
  const ScoreText = styled.div`
    font-size: 2.25rem;
    font-weight: bolder;
    background-color: white;
    padding: 18px 36px;
    border-radius: 45%;
    color: #10439F;
    font-weight: 800;
  `;
  
  const Gauge = styled.svg`
    width: 90%;
    height: auto;
    transform: rotate(-90deg);
    position: relative;
  `;
  
  const GaugeImage = styled.image.attrs<GaugeImageProps>(props => ({
    width: props.iconPath === IconDanger ? '16.2px' : '18px',
    x: props.iconPath === IconDanger ? '33.9' : '33.1',
    y: props.iconPath === IconDanger ? '33.9' : '33.1'
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
    stroke-width: 9px;
  `;
  
  const Circle = styled.circle.attrs<CircleProps>(props => ({
    cx: "18",
    cy: "18",
    r: "16"
  }))<CircleProps>`
    fill: none;
    stroke: #6200ea;
    stroke-width: 9px;
  `;
  
  const ResultContainer = styled.div`
    background-color: #FFF6D5;
    border-radius: 18px;
    box-shadow: 0 3.6px 7.2px rgba(0, 0, 0, 0.1);
    padding: 27px;
    text-align: center;
    max-width: 405px;
    width: 100%;
    margin: 18px auto;
    margin-top: 90px;
  `;
  
  const AlertMessage = styled.p<{ color: string }>`
    color: ${props => props.color};
    font-size: 1.8rem;
    margin: 6px;
    margin-top: 0px;
    font-weight: bold;
    white-space: pre-wrap;
    line-height: 25.2px;
  `;
  
  const KeywordListContainer = styled.div`
    background-color: #fff;
    border-radius: 9px;
    box-shadow: 0 1.8px 3.6px rgba(0, 0, 0, 0.1);
    padding: 18px;
    margin-top: 18px;
  `;
  
  const KeywordTitle = styled.h3`
    color: #333;
    margin-bottom: 9px;
    font-size: 1.35rem;
  `;
  
  const KeywordList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
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
    padding: 9px 13.5px;
    margin: 4.5px;
    border-radius: 18px;
    font-size: 14.4px;
    font-weight: 500;
    border: 1.8px solid #4B0082;
    transition: all 0.3s ease;
    cursor: pointer;
    opacity: 0;
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: ${props => 1.35 + props.index * 0.45}s;
  
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
  const [keywords, setKeywords] = useState<string[]>(["대출",
  "기존",
  "정부",
  "부탁",
  "내역",
  "신청",
  "대환"]);
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
        <InnerContainer>
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
        </InnerContainer>
      </ResultContainer>
      <PhishingCategory keywords={keywords} />
      <Manual/>
      <Footer />
    </Container>
  );
};

const ResultTest: React.FC = () => {
  return (
    <div>
      <CreditScore score={83} />
    </div>
  );
};

export default ResultTest;
