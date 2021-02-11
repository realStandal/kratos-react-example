import React from "react";
import { Link, RouteComponentProps } from "@reach/router";

import { assertResponse, AuthPageState } from "./common";
import {
  AuthActionContainer,
  AuthContainer,
  AuthForm,
  AuthFormField,
} from "../component";
import { AuthPublicAPI } from "../service";
import {
  formatFormFields,
  parseURLQuery,
  redirectToSelfService,
} from "../util";

// ==

export interface RegisterState extends AuthPageState {}

export class Register extends React.Component<
  RouteComponentProps,
  RegisterState
> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      errorMessage: "",
    };
  }

  componentDidMount() {
    const flowId = parseURLQuery("flow", this.props.location) as string;

    // Verify the client's registration flow.
    AuthPublicAPI.getSelfServiceRegistrationFlow(flowId)
      .then((res) => {
        if (assertResponse(res))
          redirectToSelfService("/self-service/registration/browser");

        // Note that `Flow` is different from its `flowId`
        const registrationFlow = res.data;
        const registrationType = "password";

        // Update the Registration page's state
        this.setState({
          authFormConfig: formatFormFields(registrationFlow, registrationType),
        });
      })
      .catch((err) => {
        // Any error should be considered a cause for re-initalization of the process.
        // The documents below provide the possible error-codes and the structure of `err`.
        // Note: err will be wrapped in an Axios response, reach Kratos' error object via `err.response.data.error`
        // https://www.ory.sh/kratos/docs/reference/api/#overview-23 <- Error codes
        // https://www.ory.sh/kratos/docs/reference/api/#schemagenericerror <- Structure of Kratos' response.
        redirectToSelfService("/self-service/registration/browser");
      });
  }

  render() {
    // Hide registration if we're pending confirmation that the client has actually begun the
    // registration process. (See above, `componentDidMount`)
    //
    // This would be a great opportunity to display a loading indicator, perhaps.
    if (!this.state.authFormConfig) return null;

    const formFields: JSX.Element[] = [];

    this.state.authFormConfig.fields.forEach((field, index) => {
      formFields.push(<AuthFormField key={index} field={field} />);
    });

    return (
      <AuthContainer subtitle="Logging in" title="Registration">
        <AuthForm formConfig={this.state.authFormConfig}>
          {formFields}
          <AuthActionContainer>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <Link
              to="/auth/login"
              type="link"
              className="btn btn-outline-secondary"
            >
              Login
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
