/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRODUCTHUNT_API_KEY: string
  readonly VITE_PRODUCTHUNT_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}