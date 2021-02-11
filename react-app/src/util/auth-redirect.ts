import { Config } from "../config";

/**
 * @param endpoint Is one of: https://www.ory.sh/kratos/docs/reference/api/#public-endpoints
 * For example: `self-service/login/browser`
 *
 * **Does not include proceeding `/`**. A valid `endpoint` would be: "/self-service/login/browser"
 */
export const redirectToSelfService = (endpoint: string) => {
  window.location.href = `${Config.auth.publicURL}${endpoint}`;
};
