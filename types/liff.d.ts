declare module '@line/liff' {
  interface Liff {
    init: (config: Config) => Promise<void>;
    getProfile: () => Promise<Profile>;
    isLoggedIn: () => boolean;
    login: () => void;
    logout: () => void;
    getVersion: () => string;
    sendMessages: (messages: Array<{ type: string; text: string }>) => Promise<void>;
    permission: {
      query: (permission: string) => Promise<{ state: string }>;
      requestAll: () => Promise<void>;
    };
  }

  interface Profile {
    displayName: string;
    userId: string;
    pictureUrl?: string;
    statusMessage?: string;
  }

  interface Config {
    liffId: string;
    withLoginOnExternalBrowser?: boolean;
  }

  const liff: Liff;
  export default liff;
} 