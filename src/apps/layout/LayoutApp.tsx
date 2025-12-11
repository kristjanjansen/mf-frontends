export default function LayoutApp() {
  return (
    <main className="h-screen bg-amber-300 p-4">
      <slot name="content"></slot>
    </main>
  );
}
