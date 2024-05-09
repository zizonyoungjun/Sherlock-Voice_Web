import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);  // Viewport height에 따라 높이 설정
`;

const Layout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();  // 초기 높이 설정
    window.addEventListener('resize', setVh);  // 창 크기 변경에 따라 높이 재설정

    return () => {
      window.removeEventListener('resize', setVh);  // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
