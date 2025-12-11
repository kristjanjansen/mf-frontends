export default function LayoutApp() {
  return (
    <main className="h-screen flex">
      <slot name="navigation"></slot>
      <slot name="content"></slot>
    </main>
  );
}
