import { useTranslationWithScope } from "../../utils/translations";

export default function CookiebotApp() {
  const { ts } = useTranslationWithScope("cookiebot");
  return (
    <div>
      <div className="p-4 flex flex-col gap-4 fixed right-8 bottom-8 w-1/4 border-2 rounded bg-gray-50">
        <h1 className="text-2xl font-bold">{ts("common.title")}</h1>
        <p>{ts("common.body")}</p>
      </div>
    </div>
  );
}
