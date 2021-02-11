import React from "react";
import { Link, RouteComponentProps } from "@reach/router";

import { AuthPageState, assertResponse } from "./common";
import { AuthPublicAPI } from "../service";
import {
  formatFormFields,
  parseURLQuery,
  redirectToSelfService,
} from "../util";
import {
  AuthActionContainer,
  AuthContainer,
  AuthForm,
  AuthFormField,
} from "../component";

export interface LoginState extends AuthPageState {}

export class Login extends React.Component<RouteComponentProps, LoginState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const flowId = parseURLQuery("flow", this.props.location) as string;

    AuthPublicAPI.getSelfServiceLoginFlow(flowId)
      .then((res) => {
        if (assertResponse(res))
          redirectToSelfService("/self-service/login/browser");

        const loginFlow = res.data;
        const loginType = "password";

        this.setState({
          authFormConfig: formatFormFields(loginFlow, loginType),
        });

        console.log(res.data);
      })
      .catch((err) => redirectToSelfService("/self-service/login/browser"));
  }

  render() {
    if (!this.state.authFormConfig) return null;

    const formFields: JSX.Element[] = [];

    this.state.authFormConfig.fields.forEach((field, index) => {
      formFields.push(<AuthFormField key={index} field={field} />);
    });

    return (
      <AuthContainer subtitle="Logging in" title="Login">
        <AuthForm formConfig={this.state.authFormConfig}>
          {formFields}
          <AuthActionContainer>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link
              to="/auth/register"
              type="link"
              className="btn btn-outline-secondary"
            >
              Register
            </Link>
            <Link to="/auth/recovery" type="link" className="btn btn-link">
              Forget your password? It happens.
            </Link>
          </AuthActionContainer>
        </AuthForm>
      </AuthContainer>
    );
  }
}
