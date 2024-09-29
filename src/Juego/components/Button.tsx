interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
  }
  
  function Button({ onClick, children, disabled = false }: ButtonProps) {
    return (
      <button className="button" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
  
  export default Button;
  