export type ANSData = {
  address_color: string | undefined | null;
  currentLabel: string | undefined | null;
  avatar: string | undefined | null;
} | undefined;

export const DUMMY_ANS_DATA = {
  address_color: '#ffffff',
  currentLabel: '',
  avatar: '',
}

export type userInfo = {
  userInfo: {
      user: string;
      currentLabel: string;
      ownedLabels?: {
          label: string;
          scarcity: string;
          acquisationBlock: number;
          mintedFor: number;
      }[],
      nickname?: string;
      address_color: string;
      bio?: string;
      avatar?: string;
      links?: {
          github?: string;
          twitter?: string;
          customUrl?: string;
          instagram?: string;
      },
      subdomains?: any;
      freeSubdomains: number;
  };
};
