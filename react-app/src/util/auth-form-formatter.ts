/**
 * This file has been taken 1-to-1 from https://github.com/ory/kratos-selfservice-ui-node/blob/master/src/helpers.ts
 *
 * Slightly altered to provide a more consistent interface.
 */

import { Flows, FormField } from "@ory/kratos-client";
import { getFormFieldPosition } from "../util";

const assertFormMethod = (flow: Flows, method: string): number => {
  if (flow.active && flow.active !== method) {
    // The flow has an active method but it is not the one we're looking at -> return empty
    return 1;
  }

  if (!flow.methods[method]) {
    // The flow method is apparently not configured -> return empty
    return 1;
  }

  return 0;
};

export const formatFormFieldValues = (flow: Flows, method: string) => {
  if (assertFormMethod(flow, method)) return;

  const temp: Record<string, any> = {};

  flow.methods[method].config.fields.forEach((field) => {
    temp[field.name] = field.value;
  });

  return temp;
};

/**
 * Format `method.config` to provide a more uniform and consistent UX.
 *
 * @param flow - a `Login`, `Registration`, etc. `Flow` as returned by Kratos.
 * @param method - The auth method to perform the formatting on.
 */
export const formatFormFields = (flow: Flows, method: string) => {
  if (assertFormMethod(flow, method)) return;

  const config = flow.methods[method].config;

  config.fields.sort(
    (first: FormField, second: FormField) =>
      getFormFieldPosition(first) - getFormFieldPosition(second)
  );

  return config;
};
