import React, { PropsWithChildren } from 'react'
import RelayContext from './relay'
import UserContext from './user'

interface IProps { }

const AppProvider = ({ children }: PropsWithChildren<IProps>) => {
  return (
    <UserContext>
      <RelayContext>
        {children}
      </RelayContext>
    </UserContext>
  )
}

export default AppProvider
