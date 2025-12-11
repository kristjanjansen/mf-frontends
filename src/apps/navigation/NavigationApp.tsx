export type NavigationAppProps = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

const links = [
  { path: "/billing", label: "Billing" },
  { path: "/dashboard", label: "Dashboard" },
];

export default function NavigationApp({
  currentPath,
  onNavigate,
}: NavigationAppProps) {
  return (
    <nav>
      {links.map((link) => {
        const active = link.path === currentPath;
        return (
          <button
            key={link.path}
            onClick={() => onNavigate(link.path)}
            style={{
              textDecoration: active ? "underline" : "",
            }}
          >
            {link.label}
          </button>
        );
      })}
    </nav>
  );
}
