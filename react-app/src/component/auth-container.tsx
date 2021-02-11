import React from "react";

export interface AuthContainerProps {
  title: string;
  subtitle: string;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  subtitle,
  title,
}) => (
  <div
    className="container d-flex flex-column justify-content-center align-items-center p-4 min-vh-100"
    style={{ maxWidth: "28rem" }}
  >
    <div className="card w-100">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <h6 className="card-subtitle mb-4 text-muted">{subtitle}</h6>
        {children}
      </div>
    </div>
  </div>
);
