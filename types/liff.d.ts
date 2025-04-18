declare module '@line/liff' {
  import { Liff } from '@line/liff';
  
  export interface LiffWindow extends Window {
    liff?: Liff;
  }

  export interface Profile {
    displayName: string;
    userId: string;
    pictureUrl?: string;
    statusMessage?: string;
  }

  export interface Config {
    liffId: string;
    withLoginOnExternalBrowser?: boolean;
  }
} 