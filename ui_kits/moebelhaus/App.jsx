// Interliving Rehmann — storefront app shell (routing + cart)
function Toast({ msg, onClose }) {
  React.useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50,
      background: "var(--navy-600)", color: "#fff", padding: "14px 20px", borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 12,
      fontFamily: "var(--font-sans)", fontWeight: "var(--fw-medium)", fontSize: "var(--fs-sm)",
      animation: "rehToastIn 240ms cubic-bezier(0.16,1,0.3,1)",
    }}>
      <span style={{ color: "var(--red-300)", display: "inline-flex" }}><Icon name="check-circle" size={20} /></span>
      {msg}
    </div>
  );
}

function App() {
  const [route, setRoute] = React.useState({ name: "home" });
  const [cart, setCart] = React.useState(0);
  const [toast, setToast] = React.useState("");

  const go = (r) => { setRoute(r); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const onHome = () => go({ name: "home" });
  const onCategory = (catId) => go({ name: "category", catId });
  const onProduct = (productId) => go({ name: "product", productId });
  const onAdd = (p) => { setCart((c) => c + 1); setToast(`„${p.title}" wurde in den Warenkorb gelegt.`); };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface-page)" }}>
      <Header
        cartCount={cart}
        activeCat={route.name === "category" ? route.catId : (route.name === "product" ? null : null)}
        onHome={onHome} onCategory={onCategory} onCart={() => setToast(cart ? `${cart} Artikel im Warenkorb.` : "Ihr Warenkorb ist noch leer.")} />
      <main style={{ flex: 1 }}>
        {route.name === "home" && <HomeScreen onCategory={onCategory} onProduct={onProduct} onAdd={onAdd} />}
        {route.name === "category" && <CategoryScreen catId={route.catId} onProduct={onProduct} onAdd={onAdd} />}
        {route.name === "product" && <ProductScreen productId={route.productId} onAdd={onAdd} onCategory={onCategory} />}
      </main>
      <Footer />
      <Toast msg={toast} onClose={() => setToast("")} />
    </div>
  );
}
window.App = App;
