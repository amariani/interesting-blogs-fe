import React from "react";

const NotificationMesage = ({ notificationType, message }) => {
  if (!message) {
    return null;
  }

  const classNameType = notificationType === "error" ? "error" : "success";

  return (
    <div className={`NotificationMesage__wrapper ${classNameType}`}>
      {message}
    </div>
  );
};

export default NotificationMesage;
