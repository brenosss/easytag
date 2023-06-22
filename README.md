# EasyTags

## Test stripe integration local:

https://stripe.com/docs/webhooks/test

> stripe listen --forward-to localhost:3000/api/settings/webhooks

## Running this Project Locally

Before running the project locally, ensure that you have the following requirements installed:

- git
- Docker
- yarn
- Node (latest version)
- direnv

Follow the steps below to set up and run the project:

#### 1. Clone the GitHub repository by running the following command in your terminal:

```bash
   git clone git@github.com:brenosss/easytag.git
```

#### 2. Open a new terminal window and navigate to the `easytag` folder:

```bash
   cd easytag
```

#### 3. Duplicate the `.env-example` file and rename the copy to `.env`.

#### 4. Add the following environment variables and their respective values to the `.env` file:

```bash
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   PAYMENTS_SUCCESS_URL
   CLOUDFLARE_ACCOUNT_ID
   CLOUDFLARE_API_TOKEN
```

You can find these values in the `.envrc` file.

#### 5. If you wish to enable login functionality, your `.env` file must also include the following variables and their respective values:

   For Google authentication:

```bash
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
```
   For Azure authentication:
```bash
   AZURE_CLIENT_ID=
   AZURE_CLIENT_SECRET=
   AZURE_TENANT_ID=
```

#### 6. Run Docker Compose to start the database:

```bash
   docker compose up
```

#### 7. Open another terminal window and run the following commands:

```bash
   yarn
```

```bash
   yarn dev
```

   This will install the necessary dependencies and start the application.

#### 8. The application is now running locally.

   Access the database at: [http://localhost:5432](http://localhost:5432)

   Access the application at: [http://localhost:3000/#](http://localhost:3000/#)

By following these steps, you should have the project up and running on your local machine.