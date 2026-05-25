export namespace NodeJS {
  export interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly RESEND_API_KEY: string;

    readonly npm_package_name: string;
    readonly npm_package_version: string;
  }
}
