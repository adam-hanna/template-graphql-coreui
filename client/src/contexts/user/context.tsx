import React, { createContext, useState, PropsWithChildren } from "react"

export type User = {
  id?: string;
  email?: string;
}

export interface IUser extends User {
  clearUser(): void
  setUser(arg0: User): void
}

export const UserContext = createContext<IUser | undefined>(undefined);

interface IProps {}
export const UserProvider = ({ children }: PropsWithChildren<IProps>) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const clearUser = () => {
    setUser(undefined)
  }

  return (
    <UserContext.Provider
      value={{
        ...user,
        clearUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
