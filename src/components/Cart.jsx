import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "../components/useUser";

const CartItem = ({ name, price, quantity, image, onIncrease, onDecrease }) => {
  return (
    <div className="card h-100">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: ${price / 100}</p>
        <p className="card-text">Quantity: {quantity}</p>
        <button className="btn btn-primary me-2" onClick={onIncrease}>
          +
        </button>
        <button className="btn btn-secondary" onClick={onDecrease}>
          -
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

const TotalSection = ({ total, token }) => {
  return (
    <div className="mt-4">
      <h2>Total: ${total / 100}</h2>
      <button className="btn btn-success" disabled={!token}>
        Pay
      </button>
    </div>
  );
};

TotalSection.propTypes = {
  total: PropTypes.number.isRequired,
  token: PropTypes.bool.isRequired,
};

const Cart = () => {
  const { token } = useUser();

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : [
          {
            id: 1,
            name: "Napolitana",
            price: 5950,
            quantity: 1,
            image:
              "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c",
          },
          {
            id: 2,
            name: "Española",
            price: 6950,
            quantity: 1,
            image:
              "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab",
          },
          {
            id: 3,
            name: "Pepperoni",
            price: 6950,
            quantity: 1,
            image:
              "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3",
          },
        ];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage());

  const updateQuantity = (id, delta) => {
    const newCart = cart.map((pizza) => {
      if (pizza.id === id) {
        const newQuantity = Math.max(0, pizza.quantity + delta);
        return {
          ...pizza,
          quantity: newQuantity,
        };
      }
      return pizza;
    });
    setCart(newCart);
  };

  const total = cart.reduce(
    (sum, pizza) => sum + pizza.price * pizza.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total);
    const event = new Event("cartTotalUpdated");
    window.dispatchEvent(event);
  }, [cart, total]);

  return (
    <div className="container-fluid px-4">
      <h1 className="mb-4">Pizza Cart</h1>
      <div className="row g-4">
        {cart.map((pizza) => (
          <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
            <CartItem
              name={pizza.name}
              price={pizza.price}
              quantity={pizza.quantity}
              image={pizza.image}
              onIncrease={() => updateQuantity(pizza.id, 1)}
              onDecrease={() => updateQuantity(pizza.id, -1)}
            />
          </div>
        ))}
      </div>
      <TotalSection total={total} token={token} />{" "}
      {/* Aquí se almacena el token en TotalSection */}
    </div>
  );
};

export default Cart;
