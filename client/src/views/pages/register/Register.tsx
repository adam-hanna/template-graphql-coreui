import React, { useState, useContext } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  //CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import graphql from 'babel-plugin-relay/macro'
import { useRelayEnvironment } from 'react-relay/hooks'
import { commitMutation } from 'react-relay'

import { UserContext } from '../../../contexts/user'
import { RegisterMutationResponse } from './__generated__/RegisterMutation.graphql'

const registerMutation = graphql`
  mutation RegisterMutation(
    $email: String!,
    $password: String!,
  ) {
    register(email: $email, password: $password) {
      id
      email
    }
  }
`

const Register = () => {
  const environment = useRelayEnvironment()
  const user = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const isValid = (p1: string, p2: string): boolean => {
    if (!p2) {
      return true
    }

    return p1 === p2
  }

  const register = ({ email, password }: { email: string; password: string; }) => {
    const variables = {
      email,
      password,
    }

    commitMutation(
      environment,
      {
        mutation: registerMutation,
        variables,
        onCompleted: (response, errors) => {
          if (errors) {
            console.error(errors)
            return
          }

          if ((response as RegisterMutationResponse) && (response as RegisterMutationResponse).register) {
            user?.setUser({
              id: (response as RegisterMutationResponse).register.id,
              email: (response as RegisterMutationResponse).register.email,
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
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value)
                      }}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value)
                      }}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      invalid={!isValid(password, password2)}
                      type="password"
                      value={password2}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword2(e.target.value)
                      }}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                    {isValid(password, password2) ? (
                      <></>
                    ) : (
                      <CInvalidFeedback>passwords do not match</CInvalidFeedback>
                    )}
                  </CInputGroup>
                  <CButton
                    color="success"
                    block
                    disabled={email === '' || password === '' || password2 === '' || !isValid(password, password2)}
                    onClick={() => {
                      console.log("submitting")
                      register({ email, password })
                    }}
                  >
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              {/*
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
              */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
