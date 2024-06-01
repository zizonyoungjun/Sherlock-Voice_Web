import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import giftCardLottie from '../../assets/lottie/giftCardLottie.json';
import lotteryLottie from '../../assets/lottie/lotteryLottie.json';
import loanLottie from '../../assets/lottie/loanLottie.json';
import governmentLottie from '../../assets/lottie/governmentLottie.json';

interface PhishingCategoryProps {
  keywords: string[];
}

const CategoryContainer = styled.div`
  background-color: #FFF6D5;
  border-radius: 18px;
  box-shadow: 0 3.6px 7.2px rgba(0, 0, 0, 0.1);
  padding: 18px;
  text-align: center;
  max-width: 405px;
  width: 100%;
  margin: 18px auto;
  margin-top: 20px;
`;

const InnerContainer = styled.div`
  border: 3px solid #fff;
  border-radius: 16px;
  padding: 16px;
`;

const DescriptionText = styled.span`
  color: #333;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 9px;
  white-space: pre-wrap;
  line-height: 1;
`;

const HighlightedText = styled.span`
  font-size: 2rem;
  font-weight: 900;
  color: #FF0000; /* 색상을 변경할 수 있습니다 */
`;

const LottieContainer = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
`;

const InstructionText = styled.p`
  color: #333;
  font-size: 1.5rem;
  margin-top: 10px;
  white-space: pre-wrap;
  line-height: 1.5;
  text-align: center;
  font-weight: 800;
  background-color: white;
  padding : 20px;
  border-radius: 18px;
`;

const PhishingCategory: React.FC<PhishingCategoryProps> = ({ keywords }) => {
  const [lottieAnimation, setLottieAnimation] = useState<any>(null);
  const [instructionTitle, setInstructionTitle] = useState<string>('');
  const [instructionText, setInstructionText] = useState<string>('');

  useEffect(() => {
    if (keywords.includes("대출")) {
      setLottieAnimation(loanLottie);
      setInstructionTitle("분석한 결과,\n'대출 사기형'이\n의심됩니다!");
      setInstructionText("대출 사기형이란, 낮은 금리로 대출을 해준다며 선입금이나 수수료를 요구하는 유형입니다. 실제로는 대출이 이루어지지 않고, 선입금만 가로채는 방식으로 사용자에게 금전적인 피해를 줍니다.");
    } else if (keywords.includes("검찰청")) {
      setLottieAnimation(governmentLottie);
      setInstructionTitle("분석한 결과,\n'기관 사칭형'이\n의심됩니다!");
      setInstructionText("기관 사칭형이란, 경찰서, 검찰청, 금융감독원, 은행 등의 기관을 사칭하여 사용자의 계좌 정보나 개인 정보를 요구하는 유형입니다. 주로 범죄 연루 혐의 등을 빌미로 협박하여 사용자의 정보를 탈취하려고 합니다.");
    } else if (keywords.includes("복권")) {
      setLottieAnimation(lotteryLottie);
      setInstructionTitle("분석한 결과,\n'복권 당첨형'이\n의심됩니다!");
      setInstructionText("복권 당첨형이란, 복권에 당첨되었다거나 큰 금액의 상금을 받았다는 거짓 정보를 주고, 상금을 받기 위해 세금이나 수수료를 먼저 납부하라고 요구하는 유형입니다. 이는 실제로 존재하지 않는 상금을 빌미로 사용자의 돈을 가로채려는 수법입니다.");
    } else if (keywords.includes("상품권")) {
      setLottieAnimation(giftCardLottie);
      setInstructionTitle("분석한 결과,\n'상품권 사기형'이\n의심됩니다!");
      setInstructionText("상품권 사기형이란, 상품권이나 기프트카드를 구입하도록 유도한 뒤, 그 코드를 요구하는 유형입니다. 주로 이메일이나 문자 메시지를 통해 접근하여 사용자의 상품권 정보를 탈취하려고 합니다.");
    }
  }, [keywords]);

  const renderInstructionTitle = () => {
    const highlightKeywords = ["'대출 사기형'", "'기관 사칭형'", "'복권 당첨형'", "'상품권 사기형'"];
    const parts = instructionTitle.split(new RegExp(`(${highlightKeywords.join('|')})`, 'g'));

    return parts.map((part, index) =>
      highlightKeywords.includes(part) ? (
        <HighlightedText key={index}>{part}</HighlightedText>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <CategoryContainer>
      <InnerContainer>
        <DescriptionText>{renderInstructionTitle()}</DescriptionText>
        {lottieAnimation && (
          <LottieContainer>
            <Lottie animationData={lottieAnimation} loop={true} />
          </LottieContainer>
        )}
        <InstructionText>{instructionText}</InstructionText>
      </InnerContainer>
    </CategoryContainer>
  );
};

export default PhishingCategory;
