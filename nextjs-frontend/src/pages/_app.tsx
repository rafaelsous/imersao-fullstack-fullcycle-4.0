import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import type { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import { TenantProvider } from '../contexts/TenantProvider';

import '../styles/globals.css';
import { KEYCLOAK_PUBLIC_CONFIG } from '../utils/auth';
import { parseCookies } from '../utils/cookies';
import theme from '../utils/theme';

function MyApp({ Component, pageProps, cookies }: AppProps & { cookies: any }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <SSRKeycloakProvider
      keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
      persistor={SSRCookies(cookies)}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          typeof window !== 'undefined'
            ? `${window.location.origin}/silent-check-sso.html`
            : null,
      }}
    >
      <TenantProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </TenantProvider>
    </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req),
  };
};

export default MyApp;
