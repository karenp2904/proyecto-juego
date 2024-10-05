// NotificationPanel.tsx
import React from 'react';
import './Notification.css'; // Custom styles for notifications
import Notificaciones from './Notificaciones';

const NotificationPanel: React.FC = () => {
    // Call the method to get the message
    const mensaje = Notificaciones.getMessage();

    return (
        <div className="notification-panel">
            <h3>Notificaciones de Subasta</h3>
            <ul>
                <li>{mensaje}</li>
            </ul>
        </div>
    );
};

export default NotificationPanel;

