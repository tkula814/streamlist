import { useEffect, useState } from "react";

function CreditCard() {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [savedCards, setSavedCards] = useState(() => {
    try {
      const saved = localStorage.getItem("streamListCards");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading saved cards:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("streamListCards", JSON.stringify(savedCards));
  }, [savedCards]);

  const formatCardNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
    return numbersOnly.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(formatCardNumber(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;

    if (!cardNumberPattern.test(cardNumber)) {
      alert("Credit card number must follow the format 1234 5678 9012 3456.");
      return;
    }

    if (!cardholderName || !expirationDate || !securityCode) {
      alert("Please complete all credit card fields.");
      return;
    }

    const newCard = {
      id: Date.now(),
      cardholderName,
      cardNumber,
      expirationDate,
      securityCode,
    };

    setSavedCards([...savedCards, newCard]);

    setCardholderName("");
    setCardNumber("");
    setExpirationDate("");
    setSecurityCode("");
  };

  const deleteCard = (id) => {
    setSavedCards(savedCards.filter((card) => card.id !== id));
  };

  return (
    <section className="content-card credit-card-page">
      <h1>Credit Card Management</h1>
      <p>
        Enter payment information for the StreamList checkout process. This
        course prototype stores card entries in localStorage to meet the project
        requirement.
      </p>

      <p className="security-warning">
        Security Notice: In a production system, EZTechMovie should use a
        PCI-compliant payment processor instead of storing full credit card
        information in the browser.
      </p>

      <form className="credit-card-form" onSubmit={handleSubmit}>
        <label htmlFor="cardholderName">Cardholder Name</label>
        <input
          id="cardholderName"
          type="text"
          value={cardholderName}
          onChange={(event) => setCardholderName(event.target.value)}
          placeholder="Enter cardholder's name"
        />  

        <label htmlFor="cardNumber">Credit Card Number</label>
        <input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="0000 0000 0000 0000"
          maxLength="19"
        />

        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          id="expirationDate"
          type="text"
          value={expirationDate}
          onChange={(event) => setExpirationDate(event.target.value)}
          placeholder="MM/YY"
          maxLength="5"
        />

        <label htmlFor="securityCode">Security Code</label>
        <input
          id="securityCode"
          type="password"
          value={securityCode}
          onChange={(event) =>
            setSecurityCode(event.target.value.replace(/\D/g, "").slice(0, 4))
          }
          placeholder="CVV"
          maxLength="4"
        />

        <button type="submit" className="checkout-btn">
          Save Credit Card
        </button>
      </form>

      <div className="saved-card-section">
        <h2>Saved Cards</h2>

        {savedCards.length === 0 ? (
          <p className="empty-message">No credit cards have been saved.</p>
        ) : (
          savedCards.map((card) => (
            <div key={card.id} className="saved-card">
              <p>
                <strong>Cardholder:</strong> {card.cardholderName}
              </p>
              <p>
                <strong>Card Number:</strong> {card.cardNumber}
              </p>
              <p>
                <strong>Expiration:</strong> {card.expirationDate}
              </p>

              <button
                type="button"
                className="remove-btn"
                onClick={() => deleteCard(card.id)}
              >
                Delete Card
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CreditCard;