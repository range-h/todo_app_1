"use client"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"

export default function Header() {
  const { user } = useUser()

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h1>My TODO App</h1>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {user.firstName}</span>
          <UserButton />
        </div>
      ) : (
        <SignInButton>
          <button>Sign In</button>
        </SignInButton>
      )}
    </header>
  )
}
