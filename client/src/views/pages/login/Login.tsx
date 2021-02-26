import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import graphql from 'babel-plugin-relay/macro'
import { useRelayEnvironment } from 'react-relay/hooks'
import { commitMutation } from 'react-relay'

import { UserContext } from '../../../contexts/user'
import { LoginQueryResponse } from './__generated__/LoginQuery.graphql'

const loginQuery = graphql`
  query LoginQuery(
    $email: String!,
    $password: String!,
  ) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`

const Login = () => {
  const environment = useRelayEnvironment()
  const user = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = ({ email, password }: { email: string; password: string; }) => {
    const variables = {
      email,
      password,
    }

    commitMutation(
      environment,
      {
        mutation: loginQuery,
        variables,
        onCompleted: (response, errors) => {
          if (errors) {
            console.error(errors)
            return
          }

          if ((response as LoginQueryResponse) && (response as LoginQueryResponse).login) {
            user?.setUser({
              id: (response as LoginQueryResponse).login.id,
              email: (response as LoginQueryResponse).login.email,
            })
          }
        },
        onError: err => console.error(err),
      },
    );
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value)
                        }}
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPassword(e.target.value)
                        }}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          disabled={email === '' || password === ''}
                          onClick={() => {
                            console.log("logging in")
                            login({ email, password })
                          }}
                        >
                          Login
                        </CButton>
                      </CCol>
                      {/*
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                      */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>If you don't already have an account, sign up now!</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
