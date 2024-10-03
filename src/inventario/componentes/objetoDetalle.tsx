interface ObjDetalleProps {
  titulo: string;
  img: string;
  estadisticas: string;
  calificacion?: number;
}

function ObjDetalle(props: ObjDetalleProps) {
  const { titulo, img, estadisticas } = props;

  return (
    <div className="ObjDetalle">
      <h2>{titulo}</h2>
      <img src={img} alt={img} />
      <span>{estadisticas}</span>
    </div>
  );
}

export default ObjDetalle;
