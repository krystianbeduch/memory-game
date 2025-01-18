import React, {useEffect} from "react";
import '../styles/AlertWithTimer.css';

interface AlertProps {
    message: string | null;
    type: string | null;
    show: boolean;
    duration?: number;
    onClose: () => void;
}

const AlertWithTimer: React.FC<AlertProps> = ({ message, type, show, duration = 5000, onClose }) => {

    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show || !message) {
        return null;
    }

    return (
        <div className="d-flex justify-content-center notifications">
            <div
                className={`alert alert-${type} alert-dismissible custom-alert`}
                role="alert"
            >
                <span>{message}</span>
                <div className="progress-bar-timer">
                    <div
                        className={`progress-bar-fill ${type}`}
                        style={{ animationDuration: `${duration}ms` }}
                    ></div>
                </div>
            </div>
    </div>
    )
};

export default AlertWithTimer;