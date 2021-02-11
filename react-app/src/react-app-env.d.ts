/// <reference types="react-scripts" />

import "@ory/kratos-client";
import {
  LoginFlow,
  RegistrationFlow,
  RecoveryFlow,
  SettingsFlow,
  VerificationFlow,
  LoginFlowMethodConfig,
  RecoveryFlowMethodConfig,
  RegistrationFlowMethodConfig,
  SettingsFlowMethodConfig,
  VerificationFlowMethodConfig,
} from "@ory/kratos-client";

declare module "@ory/kratos-client" {
  type Flows =
    | LoginFlow
    | RegistrationFlow
    | RecoveryFlow
    | SettingsFlow
    | VerificationFlow;

  type FlowMethodConfig =
    | LoginFlowMethodConfig
    | RegistrationFlowMethodConfig
    | SettingsFlowMethodConfig
    | RecoveryFlowMethodConfig
    | VerificationFlowMethodConfig;
}
