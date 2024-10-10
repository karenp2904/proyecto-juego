<div className="sub-section1">
  {/* Título de la Sección */}
  <p className="heroes-title">HÉROES</p>

  {/* Contenedor Principal del Cuadro de Héroes */}
  <div className="hero-container">
    {/* Tarjetas de Héroes */}
    <div className="hero-card">
      <img src="mago.jpeg" className="w-full h-full object-cover" alt="heroe" />
    </div>
    <div className="hero-card"></div>
    <div className="hero-card"></div>
    <div className="hero-card"></div>
  </div>
</div>;

{
  /* <div className="sub-section1">
            <h1>HÉROES</h1>
            <div className="hero-selection">
              {heroes.map((hero) => (
                <div
                  key={hero.id}
                  className={`hero-option ${
                    selectedHero?.id === hero.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedHero(hero)}
                >
                  <img src={hero.image} alt={hero.name} />
                  <span>{hero.name}</span>
                </div>
              ))}
            </div>
          </div> */
}
