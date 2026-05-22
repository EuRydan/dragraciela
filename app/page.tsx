"use client"

import { useScrollFadeUp } from "@/hooks/use-scroll-fade"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Diferenciais } from "@/components/diferenciais"
import { Sobre } from "@/components/sobre"
import { AreasAtuacao } from "@/components/areas-atuacao"
import { ComoAtuo } from "@/components/como-atuo"
import { Plantao } from "@/components/plantao"
import { FAQ } from "@/components/faq"
import { Videos } from "@/components/videos"
import { Depoimentos } from "@/components/depoimentos"
import { CTAFinal } from "@/components/cta-final"
import { Footer } from "@/components/footer"

export default function Home() {
  useScrollFadeUp()

  return (
    <>
      <Header />
      <main style={{ position: "relative", overflow: "visible" }}>
        <Hero />
        <Diferenciais />
        <Sobre />
        <AreasAtuacao />
        <ComoAtuo />
        <Plantao />
        <FAQ />
        <Videos />
        <Depoimentos />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}

