interface BoxProps {
  titulo: string;
  numero: number;
}

function BoxEstadisticas(props: BoxProps) {
  const { titulo, numero } = props;

  return (
    <div className="boxestadisticas">
      <h4>{titulo}</h4>
      <span>{numero}</span>
    </div>
  );
}

export default BoxEstadisticas;
