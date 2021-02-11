import React from "react";
import { FormField, Message } from "@ory/kratos-client";

import { getFormFieldTitle, getFormPlaceholder } from "../util";

const AuthFormFieldMessage: React.FC<{ messages?: Message[] }> = ({
  messages,
}) => {
  if (!messages || messages === []) return null;

  const messageList: JSX.Element[] = messages.map((value: Message, index) => {
    let messageSeverity = "";

    switch (value.type) {
      case "error": {
        messageSeverity = "text-danger";
        break;
      }
      case "warn": {
        messageSeverity = "text-warning";
        break;
      }
      default: {
        messageSeverity = "text-primary";
      }
    }

    return (
      <p key={index} className={`mb-0 ${messageSeverity}`}>
        {value.text}
      </p>
    );
  }) as JSX.Element[];

  return <div className="form-text">{messageList}</div>;
};

// ==

export interface AuthFormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: FormField;
}

export const AuthFormField: React.FC<AuthFormFieldProps> = ({
  field,
  ...otherProps
}) => (
  <div
    className={`form-group ${field.type !== "hidden" ? "visible" : "d-none"}`}
  >
    <label htmlFor={field.name} className="form-label">
      {getFormFieldTitle(field)}
    </label>
    <input
      className="form-control"
      /// @ts-ignore
      defaultValue={field.value}
      disabled={field.disabled}
      id={field.name}
      name={field.name}
      pattern={field.pattern}
      placeholder={getFormPlaceholder(field)}
      required={field.required}
      type={field.type}
    />
    <AuthFormFieldMessage messages={field.messages} />
  </div>
);
