'use client'

import { useEffect, useState } from "react"

export const Setup = () => {
  const [value, setValue] = useState({domain: '', name: '', description: '', email: '', password: ''})

  useEffect(() => {

  }, [value])

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
    return
  }

  const setup = async () => {
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })

    } catch (ignored) {}
  }

  return (
    <>
      <div className="w-full max-w-xs grid grid-cols-1">
        <label>Site domain</label>
        <input type="text" name="domain" onChange={inputHandler} />
        <label>Site name</label>
        <input type="text" name="name" onChange={inputHandler} />
        <label>Site description</label>
        <input type="text" name="description" onChange={inputHandler} />
        <label>Admin email</label>
        <input type="text" name="email" onChange={inputHandler} />
        <label>Admin password</label>
        <input type="password" name="password" onChange={inputHandler} />
        <button type="button" onClick={() => setup()}>Setup</button>
      </div>
    </>
  )
}