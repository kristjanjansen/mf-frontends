import i18n from "i18next";
import type { KeyPrefix } from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next, useTranslation } from "react-i18next";

const baseUrl = (import.meta.env.VITE_TRANSLATIONS_URL || "").replace(
  /\/$/,
  ""
);

if (!baseUrl) {
  console.warn(
    "i18n: VITE_TRANSLATIONS_URL is empty; i18next-http-backend will request /{{lng}}/{{ns}}.json from the app origin"
  );
} else {
  console.info("i18n: using translations baseUrl", baseUrl);
}

const ns = ["billing", "dashboard", "cookiebot"] as const;

type TranslationsNS = (typeof ns)[number];
const defaultNS: TranslationsNS = "billing";

const loadPath = `${baseUrl}/{{lng}}/{{ns}}.json`;

console.info("i18n: debug enabled");
console.info("i18n: baseUrl", baseUrl || "(empty)");
console.info("i18n: loadPath", loadPath);

i18n.on("languageChanged", (lng) => {
  console.info("i18n: languageChanged", lng);
});

i18n.on("loaded", (loaded) => {
  console.info("i18n: loaded", loaded);
});

i18n.on("failedLoading", (lng, ns, msg) => {
  console.warn("i18n: failedLoading", { lng, ns, msg });
});

i18n.on("missingKey", (lngs, ns, key, res) => {
  console.warn("i18n: missingKey", { lngs, ns, key, res });
});

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
      loadPath,
    },

    react: {
      useSuspense: false,
    },
  });

void (async () => {
  const lng =
    typeof i18n.language === "string" && i18n.language ? i18n.language : "en";

  await Promise.all(
    ns.map(async (n) => {
      const url = `${baseUrl}/${lng}/${n}.json`;
      try {
        const res = await fetch(url, { method: "GET" });
        const body = await res.text();
        console.info("i18n: probe", {
          url,
          status: res.status,
          ok: res.ok,
          bodyPreview: body.slice(0, 200),
        });
      } catch (err) {
        console.warn("i18n: probe failed", { url, err });
      }
    })
  );
})();

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
