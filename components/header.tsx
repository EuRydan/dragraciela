"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#inicio")

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("header")) setMenuOpen(false)
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [menuOpen])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: "-20% 0px -70% 0px"
      }
    )

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "#FFFFFF" : "transparent",
        borderBottom: `1px solid ${scrolled ? "#EBEBEB" : "transparent"}`,
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.07)" : "none",
      }}
    >
      {/* Bulletproof local CSS for responsive display logic */}
      <style dangerouslySetInnerHTML={{ __html: `
        .graciela-desktop-nav {
          display: flex !important;
          align-items: center;
          gap: 32px;
        }
        .graciela-mobile-hamburger {
          display: none !important;
        }
        @keyframes fadeUpIndicator {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1023px) {
          .graciela-desktop-nav {
            display: none !important;
          }
          .graciela-mobile-hamburger {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}} />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="#inicio"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            minHeight: 44,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              fontWeight: 500,
              color: scrolled ? "#0D0D0D" : "#FFFFFF",
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease",
            }}
          >
            Dra. Graciela
          </span>
        </Link>

        {/* Desktop nav — using robust classes to control display responsive layout */}
        <nav
          aria-label="Navegação principal"
          className="graciela-desktop-nav"
        >
          {navLinks.map((l) => {
            const isActive = activeSection === l.href;
            return (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 400,
                color: scrolled 
                  ? (isActive ? "#6B0E08" : "#6B6B6B") 
                  : (isActive ? "#FFFFFF" : "rgba(255,255,255,0.75)"),
                textDecoration: "none",
                transition: "color 0.2s ease",
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = scrolled ? "#0D0D0D" : "#FFFFFF")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = scrolled
                  ? (isActive ? "#6B0E08" : "#6B6B6B")
                  : (isActive ? "#FFFFFF" : "rgba(255,255,255,0.75)"))
              }
            >
              {l.label}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: scrolled ? "#6B0E08" : "#FFFFFF",
                    borderRadius: 2,
                    animation: "fadeUpIndicator 0.2s ease forwards",
                  }}
                />
              )}
            </Link>
            )
          })}
          <MagneticButton>
            <a
              href="https://wa.me/5521973971095"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label="Entrar em contato pelo WhatsApp com a Dra. Graciela"
              style={{ padding: "10px 22px", fontSize: 13 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Fale Comigo
            </a>
          </MagneticButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="graciela-mobile-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu de navegação"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            minWidth: 44,
            minHeight: 44,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={scrolled ? "#6B0E08" : "#FFFFFF"}
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ transition: "stroke 0.3s ease" }}
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Menu de navegação"
          style={{
            background: "#FFFFFF",
            borderTop: "1px solid #EBEBEB",
            padding: "0 24px 24px",
            width: "100%",
          }}
        >
          {navLinks.map((l) => {
            const isActive = activeSection === l.href;
            return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 400,
                color: isActive ? "#6B0E08" : "#0D0D0D",
                textDecoration: "none",
                minHeight: 48,
                borderBottom: "1px solid #F0F0F0",
                paddingLeft: 0,
              }}
            >
              {l.label}
              {isActive && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#6B0E08",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Link>
          )})}
          <a
            href="https://wa.me/5521973971095"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar em contato pelo WhatsApp com a Dra. Graciela"
            className="btn-primary"
            style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
            onClick={() => setMenuOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Fale Comigo no WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

/* ─── MAGNETIC BUTTON WRAPPER ─────────────────────────────────── */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 80
    if (dist < maxDist) {
      const pull = 1 - dist / maxDist
      ref.current.style.transform = `translate(${dx * pull * 0.15}px, ${dy * pull * 0.15}px)`
    }
  }, [])

  const handleLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)"
    }
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: "inline-flex",
        transition: "transform 0.3s ease-out",
      }}
    >
      {children}
    </div>
  )
}
