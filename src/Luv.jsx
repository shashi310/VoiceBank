import React from 'react'
import { useNavigate } from 'react-router-dom/dist'

export const Luv = () => {
    const navigate=useNavigate()
  return (
    navigate("/authentication/sign-in")
  )
}
