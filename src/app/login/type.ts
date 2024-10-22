export interface LoginForm {
  email: string;
  password: string;
}

interface TokenData {
  access_token: string;
  refresh_token: string;
}

export interface ApiResponse {
  status: number;
  data: {
    token: TokenData;
    roles: string;
  };
}
