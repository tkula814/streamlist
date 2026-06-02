import { ShoppingCart } from "lucide-react";
import products from "../Data";

function Subscriptions({ addToCart, warning }) {
  return (
    <section className="content-card subscriptions-page">
      <h1>Subscriptions and EZTech Accessories</h1>
      <p>
        Review available StreamList subscription plans and EZTech accessories.
        Users may only add one subscription plan at a time, but accessories can
        be added multiple times.
      </p>

      {warning && <p className="warning-message">{warning}</p>}

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-badge">
              {product.type === "subscription" ? "Subscription" : "Accessory"}
            </div>

            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>

            <button type="button" onClick={() => addToCart(product)}>
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Subscriptions;