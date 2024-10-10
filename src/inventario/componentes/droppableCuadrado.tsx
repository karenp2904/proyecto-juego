import { useDroppable, UniqueIdentifier } from "@dnd-kit/core";

interface DroppableCuadradoProps {
  id: UniqueIdentifier;
  extraClasses?: string;
  children?: React.ReactNode;
}

const DroppableCuadrado: React.FC<DroppableCuadradoProps> = ({
  id,
  extraClasses = "",
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`cuadrado ${extraClasses} ${isOver ? "over" : ""}`}
    >
      {children}
    </div>
  );
};

export default DroppableCuadrado;
