import { Trash2, Plus, Minus } from "lucide-react";

function Cart({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="content-card cart-page">
      <h1>Your Cart</h1>
      <p>
        Review selected subscriptions and accessories. You can adjust quantities
        or remove items before checkout.
      </p>

      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>{item.type}</p>
                  <p>${item.price.toFixed(2)} each</p>
                </div>

                {item.type === "subscription" ? (
  <div className="quantity-controls subscription-quantity">
    <span>Plan Selected</span>
  </div>
) : (
  <div className="quantity-controls">
    <button type="button" onClick={() => decreaseQuantity(item.id)}>
      <Minus size={16} />
    </button>

    <span>{item.quantity}</span>

    <button type="button" onClick={() => increaseQuantity(item.id)}>
      <Plus size={16} />
    </button>
  </div>
)}

                <p className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;