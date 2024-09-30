import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error("Error fetching pizza:", error);
      }
    };

    fetchPizza();
  }, [id]);

  if (!pizza) return <div>Loading...</div>;

  return (
    <div className="pizza-details">
      <img src={pizza.img} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>Price: ${pizza.price}</p>
      <p>{pizza.desc}</p>
      <ul>
        {pizza.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button>Add to Cart</button>
    </div>
  );
};

export default Pizza;
