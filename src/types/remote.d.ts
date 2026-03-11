declare module "markbook/App" {
  import React from "react";
  const App: React.ComponentType;
  export interface AppProps {
    api: AxiosInstance;
  }

  export default React.FC<AppProps>;
}
