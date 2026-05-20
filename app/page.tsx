"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Home as HomeIcon, FileQuestion } from "lucide-react"

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Disable scrolling when page is active
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    
    requestAnimationFrame(() => setLoaded(true))

    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div
      role="alert"
      aria-label="Página não encontrada - Erro 404"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        color: "#0D0D0D",
        fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      {/* CSS STYLES (SHARP DESIGN SYSTEM, CLEAN WHITE THEME) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .content-wrapper-sharp {
          max-width: 480px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 10;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out;
        }

        .badge-error-sharp {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: rgba(107, 14, 8, 0.05);
          border: 1px solid #6B0E08;
          border-radius: 0px;
          color: #6B0E08;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .error-title-sharp {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #0D0D0D;
          margin-bottom: 16px;
        }

        .error-divider-sharp {
          width: 40px;
          height: 1.5px;
          background: #6B0E08;
          margin: 0 auto 20px auto;
        }

        .error-message-sharp {
          font-size: 14px;
          line-height: 1.6;
          color: #6B6B6B;
          margin-bottom: 32px;
        }

        .error-buttons-sharp {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-error-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #6B0E08;
          color: #FFFFFF;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 14px 24px;
          border-radius: 0px;
          text-decoration: none;
          border: none;
          box-shadow: 0 2px 8px rgba(107, 14, 8, 0.15);
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          cursor: pointer;
          min-height: 44px;
        }

        .btn-error-primary:hover {
          background: #4A0906;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(107, 14, 8, 0.25);
        }

        .btn-error-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #0D0D0D;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 13px 24px;
          border-radius: 0px;
          text-decoration: none;
          border: 1px solid rgba(0, 0, 0, 0.2);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          cursor: pointer;
          min-height: 44px;
        }

        .btn-error-secondary:hover {
          background: rgba(0, 0, 0, 0.04);
          border-color: #000000;
          transform: translateY(-1px);
        }
      `}} />

      {/* SHARP CONTENT (NO CARD SHAPE/BOX) */}
      <main
        className="content-wrapper-sharp"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #6B0E08",
              borderRadius: "0px",
            }}
          >
            <FileQuestion size={22} color="#6B0E08" strokeWidth={1.5} />
          </div>
        </div>

        <div className="badge-error-sharp">
          Erro 404
        </div>

        <h1 className="error-title-sharp">
          Página não encontrada
        </h1>
        
        <div className="error-divider-sharp" />

        <p className="error-message-sharp">
          O endereço solicitado não foi localizado ou foi removido definitivamente de nosso servidor.
        </p>

        <div className="error-buttons-sharp">
          <Link href="/" className="btn-error-primary">
            <HomeIcon size={15} strokeWidth={2} />
            Voltar ao Início
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn-error-secondary"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Retornar à Página Anterior
          </button>
        </div>
      </main>
    </div>
  )
}
