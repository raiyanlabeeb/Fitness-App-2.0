import React from 'react'

const Message = ({message}) => {
  return (
    <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
  )
}

export default Message