import React from 'react'

const ErrorMessage = ( {error}) => {
  return (
    <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
  )
}

export default ErrorMessage