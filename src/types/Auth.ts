type WalletInfo = {
  id: string;
  userId: string;
  amount: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  bonus: number;
};

type LearnTopic = {
  id: number;
  key: string;
  name: string;
};

type TestPreparation = {
  id: number;
  key: string;
  name: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  country: string;
  phone: string;
  roles: string[];
  language: string;
  birthday: string;
  isActivated: boolean;
  walletInfo: WalletInfo;
  courses: any[];
  requireNote: string;
  level: string;
  learnTopics: LearnTopic[];
  testPreparations: TestPreparation[];
  isPhoneActivated: boolean;
  timezone: number;
  studySchedule: string;
  canSendMessage: boolean;
};
