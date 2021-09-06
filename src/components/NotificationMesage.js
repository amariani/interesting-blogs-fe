import React from 'react'
import PropTypes from 'prop-types'

const NotificationMesage = ({ notificationType, message }) => {
  if (!message) {
    return null
  }

  const classNameType = notificationType === 'error' ? 'error' : 'success'

  return (
    <div data-testid="NotificationMesage" className={`NotificationMesage__wrapper ${classNameType}`}>
      {message}
    </div>
  )
}


NotificationMesage.propTypes = {
  notificationType: PropTypes.string,
  message: PropTypes.string,
}

export default NotificationMesage
