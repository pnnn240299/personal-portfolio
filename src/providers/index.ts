import mysqlProvider from "./mysqlProvider";
import restApiProvider from "./restApiProvider";
import { supabaseProvider } from "./supabaseProvider";

const providerMap = {
  mysql: mysqlProvider,
  api: restApiProvider,
  supabase: supabaseProvider,
};

export default providerMap;

export const getProvider = (type) => {
  const provider = providerMap[type];
  if (!provider) throw new Error(`Unknown provider: ${type}`);
  return provider;
};
