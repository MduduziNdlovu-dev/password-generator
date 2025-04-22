import PasswordGenerator from '@/components/PasswordGenerator'
import React from 'react'

const Home = () => {
  return (
    <main>
      <div>
        
        <h1>
          Password Generator
        </h1>
        <p>
          Generate strong passwords for your accounts with the easy-to-use password generator.
        </p>
      </div>
      <PasswordGenerator/>
      
    </main>
  )
}

export default Home