interface BoxProps {
    titulo: string;
    numero: number;
  }
  
  function BoxEstadisticas(props: BoxProps) {
    const { titulo, numero } = props;
  
    return (
      <div className="boxestadisticas">
        <h2>{titulo}</h2>
        <span>{numero}</span>
      </div>
    );
  }
  
  export default BoxEstadisticas;