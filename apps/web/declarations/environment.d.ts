declare namespace NodeJS {
  interface ProcessEnv {
    readonly RESEND_API_KEY: string;

    readonly NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: string;
    readonly NEXT_PUBLIC_POSTHOG_HOST: string;

    readonly npm_package_name: string;
    readonly npm_package_version: string;
  }
}
