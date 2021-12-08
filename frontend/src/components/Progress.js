import React from "react";
import { ProgressBar } from '@themesberg/react-bootstrap';

export default (props) => {
  const { label, variant, type = "label", size = "md", now=100 } = props;
  const textColor = type === "label" ? variant : "white";
  const bgColorClass = type === "tooltip" ? `bg-${variant}` : "";

  return (
    <div className="progress-wrapper">
      <div className="progress-info">
        <div className={`progress-${type} text-${textColor} ${bgColorClass}`}>
          {label}
        </div>
        <div className="progress-percentage">
          <span>{now}%</span>
        </div>
      </div>
      <ProgressBar className={`progress-${size}`} variant={variant} now={now} min={0} max={100} />
    </div>
  );
};
