import { navigateHost, useHostAttribute } from "../../utils/utils";

const links = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/billing", label: "Billing" },
];

export default function NavigationApp({ host }: { host: HTMLElement }) {
  const currentPath = useHostAttribute(host, "current-path") ?? "/";
  return (
    <nav className="p-4 bg-gray-100 h-full">
      {links.map((link) => {
        const active = link.path === currentPath;
        return (
          <button
            key={link.path}
            onClick={() => navigateHost(link.path)}
            className={"block p-2 cursor-pointer" + (active ? "underline" : "")}
          >
            {link.label}
          </button>
        );
      })}
    </nav>
  );
}
