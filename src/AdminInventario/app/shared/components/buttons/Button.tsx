import * as React from 'react';

interface IButtonProps {
    name: string,
    type: "submit" | "reset" | "button" | undefined
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
    return (
        <div>
            <button type={props.type} className='button-3d' onClick={props.onClick}>
                {props.name}
            </button>
        </div>
    );
};

export default Button;
