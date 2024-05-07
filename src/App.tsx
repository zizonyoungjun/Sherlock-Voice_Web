import GlobalStyle from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/Layout';
import { theme } from './styles/theme';
import Router from './components/Router';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Suspense>
              <RouterProvider router={Router} />
            </Suspense>
          </Layout>
      </ThemeProvider>
    </>
  );
}
