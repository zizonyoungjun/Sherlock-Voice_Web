import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes} from 'styled-components';

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

type KeywordMap = {
  [key: string]: {
    type: string;
    message: string;
    color: string;
    manual: string;
  };
};

const keywordMap: KeywordMap = {
  '경찰서': {
    type: '기관 사칭형',
    message: '기관을 사칭하여 사용자의 계좌 정보나 개인 정보를 요구. 주로 범죄 연루 혐의 등을 빌미로 협박함',
    color: "#2e7d32",
    manual: `-경찰서, 검찰청, 금융감독원 등을 사칭하는 경우, 해당 기관의 신분증명서나 배지 번호를 요구합니다.
-해당 기관의 공식 연락처로 직접 전화하여 사실 여부를 확인합니다.
-개인정보나 금융 정보(계좌, 통장사본, 공인인증서)를 절대 전화로 제공하지 않습니다.
-통화 내용을 녹음하여 나중에 증거로 사용할 수 있도록 합니다.`
  },
  '검찰청': {
    type: '기관 사칭형',
    message: '기관을 사칭하여 사용자의 계좌 정보나 개인 정보를 요구. 주로 범죄 연루 혐의 등을 빌미로 협박함',
    color: "#2e7d32",
    manual: `-경찰서, 검찰청, 금융감독원 등을 사칭하는 경우, 해당 기관의 신분증명서나 배지 번호를 요구합니다.
-해당 기관의 공식 연락처로 직접 전화하여 사실 여부를 확인합니다.
-개인정보나 금융 정보(계좌, 통장사본, 공인인증서)를 절대 전화로 제공하지 않습니다.
-통화 내용을 녹음하여 나중에 증거로 사용할 수 있도록 합니다.`
  },
  '금융감독원': {
    type: '기관 사칭형',
    message: '기관을 사칭하여 사용자의 계좌 정보나 개인 정보를 요구. 주로 범죄 연루 혐의 등을 빌미로 협박함',
    color: "#2e7d32",
    manual: `-경찰서, 검찰청, 금융감독원 등을 사칭하는 경우, 해당 기관의 신분증명서나 배지 번호를 요구합니다.
-해당 기관의 공식 연락처로 직접 전화하여 사실 여부를 확인합니다.
-개인정보나 금융 정보(계좌, 통장사본, 공인인증서)를 절대 전화로 제공하지 않습니다.
-통화 내용을 녹음하여 나중에 증거로 사용할 수 있도록 합니다.`
  },
  '은행': {
    type: '기관 사칭형',
    message: '기관을 사칭하여 사용자의 계좌 정보나 개인 정보를 요구. 주로 범죄 연루 혐의 등을 빌미로 협박함',
    color: "#2e7d32",
    manual: `-경찰서, 검찰청, 금융감독원 등을 사칭하는 경우, 해당 기관의 신분증명서나 배지 번호를 요구합니다.
-해당 기관의 공식 연락처로 직접 전화하여 사실 여부를 확인합니다.
-개인정보나 금융 정보(계좌, 통장사본, 공인인증서)를 절대 전화로 제공하지 않습니다.
-통화 내용을 녹음하여 나중에 증거로 사용할 수 있도록 합니다.`
  },
  '가족': {
    type: '지인 사칭형',
    message: '가족, 친구 등을 사칭하여 긴급한 상황을 이유로 금전을 요구. 예를 들어, 교통사고를 당했다거나 병원에 입원했다는 등의 이유',
    color: "#d32f2f",
    manual: `-긴급한 상황을 이야기하며 돈을 요구하는 경우, 실제 지인에게 직접 연락하여 사실 여부를 확인합니다.
-긴급한 상황을 이야기할 때, 냉정하게 상황을 판단하고 경찰서나 병원 등 관련 기관에 사실 여부를 확인합니다.
-낯선 번호로 걸려온 전화를 무조건 신뢰하지 않습니다.`
  },
  '친구': {
    type: '지인 사칭형',
    message: '가족, 친구 등을 사칭하여 긴급한 상황을 이유로 금전을 요구. 예를 들어, 교통사고를 당했다거나 병원에 입원했다는 등의 이유',
    color: "#d32f2f",
    manual: `-긴급한 상황을 이야기하며 돈을 요구하는 경우, 실제 지인에게 직접 연락하여 사실 여부를 확인합니다.
-긴급한 상황을 이야기할 때, 냉정하게 상황을 판단하고 경찰서나 병원 등 관련 기관에 사실 여부를 확인합니다.
-낯선 번호로 걸려온 전화를 무조건 신뢰하지 않습니다.`
  },
  '대출': {
    type: '대출 사기형',
    message: '낮은 금리로 대출을 해준다며 선입금이나 수수료를 요구. 실제로는 대출이 이루어지지 않고, 선입금만 가로채는 방식',
    color: "#ffc107",
    manual: `-낮은 금리나 좋은 조건을 제시하며 선입금을 요구하는 대출 광고는 의심합니다.
- 공식 금융 기관을 통해 대출 절차를 밟습니다.
-미리 돈을 요구하는 경우 절대 돈을 주지 않도록 합니다.
-제공하는 모든 서류를 꼼꼼히 읽고 확인하며, 의심스러운 부분이 있으면 금융감독원에 문의합니다.`
  },
  '상품권': {
    type: '상품권 사기형',
    message: '상품권이나 기프트카드를 구입하도록 유도한 뒤, 그 코드를 요구. 주로 이메일이나 문자 메시지를 통해 접근',
    color: "#4B0082",
    manual: `-상품권이나 기프트카드 구매를 요청하는 전화나 메시지는 무조건 의심합니다.
-인터넷에서 상품권 코드를 입력하거나 제공하지 않습니다.`
  },
  '인터넷': {
    type: '인터넷 사기형',
    message: '인터넷 쇼핑몰 등을 통해 물품을 판매한다고 속이고, 대금을 입금받은 뒤 물건을 보내지 않는 경우 또는 허위 사이트를 만들어 사용자 정보를 도용하기도 함',
    color: "#1E90FF",
    manual: `- 물품 구매 시 공신력 있는 쇼핑몰을 이용하고, 의심스러운 사이트는 피합니다.
- 물품 대금을 송금하기 전, 판매자의 신뢰도를 확인하기 위해 사기계좌 확인조회를 이용해 보는 것이 좋습니다.
- 허위 사이트를 식별하기 위해 URL을 주의 깊게 확인하고, 안전한 결제 방식을 사용합니다.`
  },
  '복권': {
    type: '복권 당첨형',
    message: '복권에 당첨되었다거나 큰 금액의 상금을 받았다는 거짓 정보를 주고, 상금을 받기 위해 세금이나 수수료를 먼저 납부하라고 요구',
    color: "#FFD700",
    manual: `-복권이나 상금 당첨을 이유로 세금이나 수수료를 요구하는 경우, 사실 여부를 반드시 확인합니다.
-실제 복권 당첨 여부는 공식 복권 사이트나 발행 기관을 통해 확인합니다.`
  },
  '기타': {
    type: '기타',
    message: '통신사나 금융 기관에 보이스피싱 피해를 알리고\n계좌를 보호합니다.',
    color: "#d32f2f",
    manual: ''
  }
};

const VoiceManual: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const numericTaskId = parseInt(taskId ?? '0', 10);
  const [keywords, setKeywords] = useState<string[]>(['검찰청', '계좌', '만나서']);

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

  const detectedKeyword = keywords.find(keyword => keywordMap.hasOwnProperty(keyword)) || '기타';
  const alertMessage = keywordMap[detectedKeyword].message;
  const messageColor = keywordMap[detectedKeyword].color;
  const typeDescription = keywordMap[detectedKeyword].type;
  const manual = keywordMap[detectedKeyword].manual;

  return (
    <Container>
      <ResultContainer>
        {keywords.length > 0 && (
          <KeywordListContainer>
            <KeywordTitle>통화 파일을 분석한 결과,</KeywordTitle>
            <AlertMessage color={messageColor}>{typeDescription}</AlertMessage>
            <AlertMessage color={messageColor}>{alertMessage}</AlertMessage>
            {manual && (
              <ManualContainer>
                <KeywordTitle>유형별 대응 매뉴얼</KeywordTitle>
                <AlertMessage color={messageColor}>{manual}</AlertMessage>
              </ManualContainer>
            )}
          </KeywordListContainer>
        )}
      </ResultContainer>
    </Container>
  );
};

export default VoiceManual;
