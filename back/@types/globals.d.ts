declare global {
      namespace NodeJS {
        interface ProcessEnv {
          BACK_PORT: string;
          FRONT_URL: string;
        }
      }
    }

export {};