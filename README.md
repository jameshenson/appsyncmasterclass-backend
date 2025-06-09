# AppSync Masterclass Backend

This project sets up a fully functional AppSync backend using the Serverless Framework. It includes GraphQL schema design, Cognito authentication, DynamoDB integration, and Lambda triggers for post-confirmation user provisioning.

---

## 🛠 Bootstrap AppSync Backend

### Steps:

1. **Create a new repository**

2. **Initialize project and add `package.json`:**
   ```bash
   npm init -y
   ```

3. **Install Serverless Framework as a dev dependency:**
   ```bash
   npm i --save-dev serverless@2.4.0
   ```

4. **Create a new Serverless project using the AWS Node.js template:**
   ```bash
   npm run sls -- create -t aws-nodejs
   ```

5. **Install Serverless AppSync plugin (compatible version):**
   ```bash
   npm install --save-dev serverless-appsync-plugin@1.8.0
   ```

6. **Reference the AppSync configuration file in `serverless.yml`:**
   - Add:
     ```yaml
     custom:
       appSync: ${file(serverless.appsync-api.yml)}
     ```

---

## 🧩 Design the Schema and Access Controls

### Tasks:

- **Design the GraphQL schema:**
  - Create or update `schema.api.graphql` with types, interfaces, queries, and mutations.

- **Update AppSync configuration:**
  - Modify `serverless.appsync-api.yml` to reference the schema and set authentication to use Cognito.

- **Configure Cognito:**
  - Update `serverless.yml` with:
    - A `CognitoUserPool`
    - A `UserPoolClient`
    - Lambda trigger via `LambdaConfig.PostConfirmation`

---

## 🚀 Deploy Backend to AWS

### Deploy:
```bash
npm run sls -- deploy --aws-profile personal-dev
```

### Post-deploy notes:
- Manually add a user to the Cognito User Pool via the AWS Console.
- Test the AppSync schema using the AppSync Query Editor.
- Initial responses may return `null` until resolvers are added.

---

## 🔁 Configure Resolvers

- Create VTL mapping templates in the `mapping-templates/` directory.
- Define resolvers in `serverless.appsync-api.yml` for each GraphQL field.
- Ensure proper data source and IAM permissions are configured.

---

## ✅ Execute PostConfirmation Lambda for User Signup

- Add a DynamoDB `UsersTable` to track registered users.
- Add a Lambda function `confirmUserSignup` to insert records after user signup.
- Trigger the function using Cognito's PostConfirmation hook.

---

## 🔐 Apply Least Privilege Principle

### Install IAM roles per function plugin:
```bash
npm i --save-dev serverless-iam-roles-per-function
```

- Add scoped IAM permissions to `confirmUserSignup` Lambda using `iamRoleStatements`.

---

## 📦 Additional Package Installations

### Install AWS SDK (as a dev dependency):
```bash
npm i --save-dev aws-sdk
```
> Note: AWS SDK v2 is available in Lambda by default. Including it only as a dev dependency helps reduce Lambda package size and improves cold start time.

### Install Chance.js to generate screen names:
```bash
npm i --save chance
```

---

## ⚠️ Known Warnings and Fixes

- **Node.js 12.x is deprecated:**
  - Updated runtime in `serverless.yml` to:
    ```yaml
    runtime: nodejs18.x
    ```

- **"Too many open files" (`EMFILE`) errors on Windows:**
  - Fixed by:
    - Using `SLS_IGNORE_WATCH=1` during deploy
    - (Optional) Patching `graceful-fs` to wrap `fs`

---

## ✅ Environment

- **Node.js:** 18.20.2
- **Serverless Framework:** 2.72.4
- **OS:** Windows 10/11
- **AppSync Plugin:** serverless-appsync-plugin@1.8.0

---

## 🔜 Next Steps

- Finalize resolvers for all GraphQL fields.
- Connect the frontend to Cognito and AppSync.
- Add integration tests for Lambda and AppSync logic.
- Secure API using Cognito scopes or custom claims.
