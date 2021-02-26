export type User = {
  id: string;
  email: string;
}

export type BalanceCheck = {
  requestor: User;
  requesteeEmail: string;
  balance: number;
  pass: boolean;
}

export type RegisterInput = {
  email: string;
  password: string;
}

export type LoginInput = {
  email: string;
  password: string;
}

export type NewBalanceCheckInput = {
  userID: string;
  requesteeEmail: string;
  balance: number;
}
