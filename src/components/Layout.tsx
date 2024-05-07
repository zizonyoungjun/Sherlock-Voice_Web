import { ReactNode, useEffect } from 'react';
import { styled } from 'styled-components';

export const LayoutWrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;

const Layout = ({ children }: { children: ReactNode }) => {
  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
