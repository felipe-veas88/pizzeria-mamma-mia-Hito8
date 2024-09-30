import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <p>¿Quieres volver a probar nuestras deliciosas pizzas?</p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
}

export default NotFound;
