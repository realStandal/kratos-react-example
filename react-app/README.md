# `react-app` example for ORY Kratos.

For usage instructions see [the repository's root](../readme.md).

This is little-more than a `create-react-app` with `@reach/router` routing and Bootstrap styling.

The Kratos identification flows were inspired by [`kratos-selfservice-ui-node`](https://github.com/ory/kratos-selfservice-ui-node). Most importantly, the user-interface will _generate_ the `<Input>` fields required for login, using infromation retrieved by the Kratos-identity management system.

A thin [`translator`](./src/util/auth-form-translator.ts) sits between the UI and these fields, providing an opportunity for Internalization and to improve end-user experience; decouping the UI from Kratos.
