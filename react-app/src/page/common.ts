import { FlowMethodConfig } from "@ory/kratos-client";

export interface AuthPageState {
  /**
   * HTML `<Form>` configuration as dictated by the Kratos instance.
   *
   * This value will entirely depend on the format of your `identity.schema.json`.
   */
  authFormConfig?: FlowMethodConfig;
  authFormFieldValue?: {
    [key: string]: string;
  };
  errorMessage?: string;
}

export const assertResponse = (res: any) => {
  // No-response = no-good
  if (!res) return 1;

  // Kratos does not respond with any success besides status 200;
  // something is wrong if it does, let's reinitalize.
  if (res.status !== 200) return 1;

  // `type` should either be 'browser' or 'api'. We do NOT need the API registration-flow
  // so something has clearly gone astray; restart the flow.
  if (res.data.type !== "browser") return 1;

  // +1
  return 0;
};
