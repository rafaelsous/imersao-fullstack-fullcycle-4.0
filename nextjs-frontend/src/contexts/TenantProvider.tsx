import { createContext, FunctionComponent, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import { useAuthSwr } from '../hooks/useAuthSwr';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  balance: number;
}

const TenantContext = createContext<Tenant>(null as any);

export default TenantContext;

export const TenantProvider: FunctionComponent = (props) => {
  const [tenant, setTenant] = useState<Tenant>();
  const { data, error } = useAuthSwr("/my-account", {
    refreshInterval: 10000,
  });

  console.log(data, error);

  useEffect(() => {
    if (!isEqual(data, tenant)) {
      setTenant(data);
    }
  }, [data, tenant]);

  return (
    <TenantContext.Provider value={tenant as any}>
      {props.children}
    </TenantContext.Provider>
  );
};
