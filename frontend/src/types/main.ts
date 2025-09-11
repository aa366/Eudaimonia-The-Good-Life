
interface UserInfo {
  _id?: string;
  username?: string;
  email?: string;
  isAdmin?: boolean;
}
interface UserStrict {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}


interface RootState {
  auth: {
    userInfo: UserInfo | null 
  };
}

interface MyAPIError {
  data?: {
    message?: string;
  };
  error?: string;
}

export type {RootState , UserInfo,MyAPIError ,UserStrict}