export { };

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            BROWSER: "chrome" | "firefox" | "webkit",
            BASEURL: string,
            HEADLESS: "true" | "false",
            APPLICATION: "SLIMS" | "OpenAccess" | "Appoint",
            TAGS: "@todo" | ""
        }
    }
}