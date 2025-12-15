import i18n from "i18next";
import type { KeyPrefix } from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next, useTranslation } from "react-i18next";

const baseUrl = (import.meta.env.VITE_TRANSLATIONS_URL || "").replace(
  /\/$/,
  ""
);

const isDev = import.meta.env.DEV;

if (isDev) {
  if (!baseUrl) {
    console.warn(
      "i18n: VITE_TRANSLATIONS_URL is empty; i18next-http-backend will request /{{lng}}/{{ns}}.json from the app origin"
    );
  } else {
    console.info("i18n: using translations baseUrl", baseUrl);
  }
}

const ns = ["billing", "dashboard"] as const;
type TranslationsNS = (typeof ns)[number];
const defaultNS: TranslationsNS = "billing";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    supportedLngs: ["en", "et"],

    ns,
    defaultNS,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: `${baseUrl}/{{lng}}/{{ns}}.json`,
    },

    react: {
      useSuspense: false,
    },
  });

if (isDev) {
  i18n.on("failedLoading", (lng, ns, msg) => {
    console.error("i18n failedLoading", { lng, ns, msg });
  });

  i18n.on("missingKey", (lngs, ns, key) => {
    console.warn("i18n missingKey", { lngs, ns, key });
  });

  i18n.on("loaded", (loaded) => {
    console.info("i18n loaded", loaded);
  });
}

export function useTranslationWithScope<NS extends TranslationsNS>(
  ns: NS,
  keyPrefix?: KeyPrefix<NS>
) {
  const { t, ...rest } = useTranslation(ns, {
    keyPrefix,
  });

  return {
    ...rest,
    ts: t,
  };
}
