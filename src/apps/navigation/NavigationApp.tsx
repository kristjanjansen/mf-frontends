export type NavigationAppProps = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

const links = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/billing", label: "Billing" },
];

export default function NavigationApp({
  currentPath,
  onNavigate,
}: NavigationAppProps) {
  return (
    <nav className="p-4 bg-gray-100 h-full">
      {links.map((link) => {
        const active = link.path === currentPath;
        return (
          <button
            key={link.path}
            onClick={() => onNavigate(link.path)}
            className={"block p-2 cursor-pointer" + (active ? "underline" : "")}
          >
            {link.label}
          </button>
        );
      })}
    </nav>
  );
}
