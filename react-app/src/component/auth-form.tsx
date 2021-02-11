import React from "react";
import { FlowMethodConfig } from "@ory/kratos-client";

export interface AuthFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  formConfig: FlowMethodConfig;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  children,
  formConfig,
  ...otherProps
}) => (
  <form
    className="d-grid gap-4"
    encType="application/x-www-form-urlencoded"
    action={formConfig.action}
    method={formConfig.method}
    {...otherProps}
  >
    {children}
  </form>
);
