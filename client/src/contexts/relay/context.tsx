import React, { PropsWithChildren } from 'react'
import { environment } from './environment'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

interface IProps { }

const RelayContext = ({ children }: PropsWithChildren<IProps>) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  )
}

export default RelayContext
