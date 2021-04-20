import { useState } from 'react'

export const useInputField = () => {
  const [value, setValue] = useState('')

  const handleChange = e => setValue(e.target.value)

  const reset = () => setValue('')

  return [value, handleChange, reset]
}
