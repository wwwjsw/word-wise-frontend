declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_DATABASE_URL: string;
      GOOGLE_APPLICATION_CREDENTIALS: string;
      EMAIL_SERVER_USER: string;
      EMAIL_SERVER_PASSWORD: string;
      EMAIL_SERVER_HOST: string;
      EMAIL_SERVER_PORT: string;
      EMAIL_FROM: string;
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      API_KEY: string;
      AUTH_DOMAIN: string;
      PROJECT_ID: string;
      NEXT_PUBLIC_MAIN_SERVICE: string;
    }
  }
}
