"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "var(--font-sans)" }}>
      <h1>Bem-vindo ao site Dr. Grapraciela</h1>
      <p>Explore nossos serviços e informações.</p>
      <Link href="/sobre">Sobre nós</Link>
    </main>
  )
}
