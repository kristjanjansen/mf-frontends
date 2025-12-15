import { useTranslationWithScope } from "../../utils/translations";

export default function DashboardApp() {
  const { ts } = useTranslationWithScope("dashboard");
  return (
    <div>
      <div className="p-4">
        <h1 className="text-4xl tracking-tight font-bold">
          {ts("common.title")}
        </h1>
      </div>
    </div>
  );
}
