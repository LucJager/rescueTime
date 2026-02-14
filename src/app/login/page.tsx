"use client"
import { useState, type FormEvent } from "react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError("Mot de passe incorrect")
        return
      }
      window.location.href = "/"
    } catch {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          autoComplete="current-password"
          autoFocus
          className="w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-pulse-cyan/50"
        />
        {error && <p className="text-sm text-pulse-red">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-lg bg-pulse-cyan/15 py-3 text-sm font-medium text-pulse-cyan transition hover:bg-pulse-cyan/25 disabled:opacity-40"
        >
          {loading ? "..." : "Entrer"}
        </button>
      </form>
    </div>
  )
}
