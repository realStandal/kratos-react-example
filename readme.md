# Kratos React Example

**This example is in-complete.** Registration and Login flows are implemented; however, functionality related to state-management, trivial UX, and other Kratos flows are yet to be created. _It still serves to provide a working-example of how Kratos recommends the identification flow take place; using [`kratos-selfservice-ui-node`](https://github.com/ory/kratos-selfservice-ui-node/tree/master/src) as a starting-point._

This is a React web-application built using [`create-react-app`](https://create-react-app.dev/docs/getting-started). It provides a self-service user-interface for interacting with a [Kratos Identity and User Management system](https://www.ory.sh/kratos/docs/).

It has been written using TypeScript and uses the [Bootstrap framework](https://getbootstrap.com) for UX.

# Major Todos

Implement trivial UI's and finish examples for other Kratos-flows. The `<Form>` elements backing the identification flows use React's uncontrolled components; I'm sure this can be changed to provide React control. Likely would result in the `<Form>`'s default submit-action being prevented and use of the [Kratos-SDK](https://github.com/ory/sdk/blob/master/clients/kratos/typescript/api.ts#L2545) (registration linked) to complete the flow. Where `flow` would be `?flow=...`, `payload` would be the state of the Form-elements, and `options` would contain a configuration to ensure `headers.Content-Type` is set to `application/x-www-form-urlencoded` **NOT** the default `application/json`.

The Login/Register screens could be refactored; there are numerous areas of repetiative code, again this is trivial.

# Getting Started

This is a _lengthy_ set of steps to use this repository and some meta-data about Kratos (for my future-benefit as well). Consult the next section if you want to just get it up-and-running, no explanation.

## Tl;dr

Assuming you're familiar with Kratos:

- You'll need:
  - [Docker](https://www.docker.com/)
    - [Docker Compose](https://www.docker.com/) or [Desktop](https://www.docker.com/products/docker-desktop)
  - [NodeJS](https://nodejs.org/en/download/) (LTS should do, this is for running the React app)
    - [Yarn](https://yarnpkg.com/getting-started/install#per-project-install) `1.22.X` installed globally.
  - (Optionally) [Postman](https://www.postman.com/) or [Curl](https://curl.se/).
- `clone` the repository into an empty directory (`./` target, or enter it once cloned).
- Run the following to start Kratos and [MailSlurper](https://mailslurper.com/) containers: `docker-compose -f kratos/docker-compose.yml up --build --force-recreate`
  - A message resembling `msg=Starting the admin httpd on: 0.0.0.0:4434` means your Kratos container is up-and-running.
  - You can verify the installation further by running `docker exec kratos kratos --help` or `curl http://127.0.0.1:4433/version`.
- Now we'll start the `react-app` in development mode using Yarn.
  - Run `cd react-app`.
  - Install dependencies (`yarn install`).
  - Start the development-server with `yarn start`.
- At this point, everything is set-up and ready for testing.
  - By default, `react-app` **will load to an empty page**.
  - Navigate to `127.0.0.1:3000/auth/register` and `127.0.0.1:3000/auth/login` to experiment with these flows.
  - The [source code](./react-app/src) can be used as a reference for implementation; the file-structure is of little importance. The most important bits are files prefixed with `auth-` and `login.tsx`/`register.tsx`.

## Prerequisites

Below are required dependencies/libraries/tools which you should have installed prior to continuing. Proceeding each is the version I will be using to write this guide; I'm not guaranteeing other versions will or will not work. [`minor` and `patch`](https://semver.org/) inconsistencies should be ok.

You're likely familiar with these; if not, nothing complex or crazy is taking place.

- [Docker Engine](https://www.docker.com/) (`20.10.2`)
  - [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) [or Mac](https://docs.docker.com/docker-for-mac/install/) (`3.1.0`)
  - [Docker Compose](https://docs.docker.com/compose/install/) _Docker Desktop includes this tool_. (`1.27.4`)

## 1) Clone the Repository

In an **empty** directory, use the following command:

```bash
$ git clone https://github.com/LockTech/kratos-react-web-example.git ./
```

## 2) Kratos Stand-up

We'll begin by starting a Kratos container with [minimal configuration](./kratos/config/). We'll be using Docker Compose to:

- Populate an SQLite database
- Start a [MailSlurper](https://mailslurper.com/) service
- Begin the Kratos container

This work-flow has been taken from the [Kratos Quickstart Guide](https://www.ory.sh/kratos/docs/quickstart/), almost verbatum. Most of the configuration files were taken from the Kratos repository.

### 2.1) Start the Containers

By running the following, still at the `root` of the project.

```bash
$ docker-compose -f kratos/docker-compose.yml --build --force-recreate
```

> The `docker-compose.yml` file has been configured to allocate `512Mb` of RAM and `.5` a CPU-core.
> You should configure this to best meet your development-needs; but I'd imagine this would cover any testing/prototyping needs.

Once completed, you should see lines resembling: "Starting the admin httpd on: 0.0.0.0:4434" and "Starting the public httpd on: 0.0.0.0:4433".

### 2.2) Testing Your Success

If so, you can use a tool such as [Postman](https://www.postman.com/downloads/) or [`curl`](https://curl.se/) to test that the endpoints are reachable.

Using `curl`, we can test that Kratos has been installed, is running, and has been configured to use the version our `docker-compose` file specified:

```bash
$ curl http://127.0.0.1:4433/version
```

Which should output, among many things, the following:

```bash
StatusCode        : 200
StatusDescription : OK
Content           : {"version":"v0.5.5-alpha.1"}
...
```

You should be able to interact with the Kratos container directly by running:

```bash
$ docker exec kratos kratos --help
```

Where the first `kratos` is the container's name, and the second is the [Kratos CLI](https://www.ory.sh/kratos/docs/cli/kratos).

## 3) Start `react-app`

From here-on-out we'll be using the `react-app` directory.

### 3.1) Install Dependencies

`react-app` uses the Yarn package manager. Install it if you don't already have it (or remove `yarn.lock`).

### 3.2) Start the development-server

Using `yarn start`, start the application in development mode. This will open your browser to `http://127.0.0.1:3000`.

> **Note:** Your page **_will_** be blank. I've yet to implement the trivial UX of the app; sorry.

### 3.3) Test Registration

Navigate to `http://127.0.0.1:3000/auth/register`. You should be automatically redirected to the `/self-service/registration/browser` endpoint, it'll likely happen faster than you can tell. You'll know you're successful if you see `?flow=XXXX...` as a query in the URL.

At this point, you've initiated the registration-flow. You can use `?flow` to interact with a few of the Kratos endpoints. `curl` the following: `/self-service/registration/flows?id=string` substituting `string` with your flow-ID. This will provide you with information on the registration flow.

You'll notice that `...fields:` contains the same fields as the UI on your browser. These fields are generated during each request, meaning a change to [`identity.schema.json`](./kratos/config/identity.schema.json) will result in a change to the UI; the only cavet is you'll need to update [`auth-form-translator`](./react-app/src/util/auth-form-translator.ts) provide a more user-friendly UI.

Go ahead and register an account; if successful, you should be redirected to the (blank) home page with an additional `cookie` containing your Kratos-token.

### 3.4) Logging Out

If you direct your browser to `http://127.0.0.1:4433/self-service/browser/flows/logout` you will be logged out. This will invalidate your current session and remove any cookies.

### 3.5) Logging In

With your session invalidated, navigate to `http://127.0.0.1/auth/login` and login to the account you just created. Once again, you should be redirected to the home page.

## 4) Administration

By default, the Kratos administrative endpoints are open and freely accessible (to anyone on your network).

You can use these, in a client such as Postman or `curl`, to view the identities stored by Kratos. With an account registered, perform `curl http://127.0.0.1:4434/identities`. This should provide you with a list of identities stored by Kratos.

## 5) Celebrate

I mean you read it! And I wrote it! Great teamwork, everyone.
