import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface CircleProps {
  score: number;
}

const Container = styled.div`
  width: 300px;
  margin: 50px auto;
  text-align: center;
  margin-top: 180px;

`;

const ScoreText = styled.div`
  font-size: 24px;
`;

const Gauge = styled.svg`
  width: 100%;
  height: auto;
  transform: rotate(-90deg);
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

const Percentage = styled.text.attrs(() => ({
  x: "18",
  y: "18",
  transform: "rotate(90deg)"
}))`
  fill: #333;
  font-size: 24px;
  dominant-baseline: middle;
  text-anchor: middle;
`;

const RatingScale = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
`;

const Label = styled.span<{ isActive: boolean }>`
  font-size: 20px;
  color: ${props => (props.isActive ? '#0000ff' : '#666')};
`;

const ScoreScale = styled.div`
  width: 100%;
  height: 10px;
  background: linear-gradient(to right, #0d0 0%, #ff0 50%, #f00 100%);
  margin-top: 8px;
`;

const ScoreNumbers = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: #666;
  margin-top: 2px;
`;

const percentage = (score: number, maxScore: number): number => (score / maxScore) * 100;

interface CreditScoreProps {
  score: number;
}

const createAnimation = (score: number) => keyframes`
  from { stroke-dasharray: 0 100; }
  to { stroke-dasharray: ${percentage(score, 100)} 100; }
`;

const AnimatedCircle = styled(Circle)<CircleProps>`
  animation: ${props => css`${createAnimation(props.score)} 1.2s ease-out forwards`};
`;

const getActiveIndex = (score: number) => Math.floor(score / 20);


const CreditScore: React.FC<CreditScoreProps> = ({ score }) => {
  const activeIndex = getActiveIndex(score);
  return (
    <Container>
      <Header/>
      <Gauge viewBox="-8 -6 48 48">
        <CircleBg cx="18" cy="18" r="16" />
        <AnimatedCircle cx="18" cy="18" r="16" score={score} />
      </Gauge>
      <ScoreText>위험도 {score}%</ScoreText>
      <RatingScale>
        {['안전', '유의', '의심', '유력', '위험'].map((label, index) => (
          <Label key={label} isActive={index === activeIndex}>{label}</Label>
        ))}
      </RatingScale>
      <ScoreScale />
      <ScoreNumbers>
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
      </ScoreNumbers>
      <Footer/>
    </Container>
  );
};

const VoiceResult: React.FC = () => {
  return (
    <div>
      <CreditScore score={77} />
    </div>
  );
};

export default VoiceResult;
