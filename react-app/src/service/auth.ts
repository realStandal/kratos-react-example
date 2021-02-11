import { Configuration, PublicApi } from "@ory/kratos-client";
import { Config } from "../config";

export const AuthPublicAPI = new PublicApi(
  new Configuration({
    basePath: Config.auth.publicURL,
  })
);
