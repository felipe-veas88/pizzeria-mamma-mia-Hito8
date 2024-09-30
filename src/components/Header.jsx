const Header = () => {
  return (
    <header
      className="text-center py-3 py-md-5 mb-4"
      style={{
        backgroundImage: "url(path/to/your/background/image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <h1 className="fw-light text-white display-4">Pizzería Mamma Mía</h1>
        <p className="lead text-white-50 mb-0">
          ¡Las mejores pizzas de la ciudad!
        </p>
      </div>
    </header>
  );
};

export default Header;
