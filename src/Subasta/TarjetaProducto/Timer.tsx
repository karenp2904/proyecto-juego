import React, { useState, useEffect } from 'react';

interface TimeInfoProps {
    totalDays: number; // La fecha de finalización en formato ISO 8601
}

const Timer: React.FC<TimeInfoProps> = ({ totalDays }) => {
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const endDateTime = new Date(totalDays);
            const now = new Date();
            const timeDiff = endDateTime.getTime() - now.getTime();

            if (timeDiff <= 0) {
                return 'Tiempo agotado';
            }

            const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
            const hours = Math.floor((timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));

            return `${days} días ${hours} h ${minutes} min `;
        };

        const updateTimer = () => {
            setTimeRemaining(calculateTimeLeft());
        };

        updateTimer(); // Inicializa el temporizador

        const interval = setInterval(updateTimer, 1000); // Actualiza cada segundo

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [totalDays]);

    return (
        <div className="time-info">
            <span className="label">Tiempo restante:</span>
            <span className="time-remaining">{timeRemaining}</span>
        </div>
    );
};

export default Timer;
