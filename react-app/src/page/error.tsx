import React from "react";
import { RouteComponentProps } from "@reach/router";

import { AuthPublicAPI } from "../service";
import { parseURLQuery } from "../util";

export class Error extends React.Component<RouteComponentProps> {
  render() {
    const query = parseURLQuery("error", this.props.location) as string;

    AuthPublicAPI.getSelfServiceError(query)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return <p>Error</p>;
  }
}
