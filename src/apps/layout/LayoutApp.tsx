export default function LayoutApp() {
  return (
    <div>
      <header>Layout Header</header>
      <main>
        <slot name="content"></slot>
        <div id="content-slot"></div>
      </main>
      <footer>Layout Footer</footer>
    </div>
  );
}
