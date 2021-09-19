import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginPage: NextPage = () => {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>()
  const { authenticated, login = () => {} } = keycloak || {}
  const { replace, query } = useRouter()
  
  const from = query.from

  useEffect(() => {
    if (!initialized) {
      return
    }

    if (!authenticated) {
      login()
    }
  }, [initialized, authenticated, login])

  useEffect(() => {
    if (!initialized) {
      return
    }

    if (authenticated) {
      replace((from as string) ?? "/")
    }
  }, [authenticated, initialized, from, replace])

  return null
};

export default LoginPage;
