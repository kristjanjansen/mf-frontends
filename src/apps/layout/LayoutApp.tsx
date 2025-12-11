export default function LayoutApp() {
  return (
    <div>
      <header>Layout Header</header>
      <main>
        <slot name="content"></slot>
      </main>
      <footer>Layout Footer</footer>
    </div>
  );
}
