"use client"
import { useEffect } from "react"

export function LgpdConsent() {
  useEffect(() => {
    // Inject CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css"
    document.head.appendChild(link)

    // Inject script
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js"
    script.async = true
    document.head.appendChild(script)

    // Poll until CookieConsent is available on window
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      const cc = (window as any).CookieConsent
      if (cc && typeof cc.run === "function") {
        clearInterval(interval)
        cc.run({
          guiOptions: {
            consentModal: {
              layout: "cloud",
              position: "bottom center",
              transition: "slide"
            },
            preferencesModal: {
              layout: "box",
              transition: "slide"
            }
          },
          categories: {
            necessary: { enabled: true, readOnly: true },
            analytics: {},
            marketing: {}
          },
          language: {
            default: "pt",
            translations: {
              pt: {
                consentModal: {
                  title: "Privacidade e cookies",
                  description: "Este site utiliza cookies para melhorar sua experiência e garantir o funcionamento de recursos como mapas e vídeos.",
                  acceptAllBtn: "Aceitar todos",
                  acceptNecessaryBtn: "Apenas necessários",
                  showPreferencesBtn: "Gerenciar preferências"
                },
                preferencesModal: {
                  title: "Preferências de privacidade",
                  savePreferencesBtn: "Salvar preferências",
                  acceptAllBtn: "Aceitar todos",
                  acceptNecessaryBtn: "Apenas necessários",
                  sections: [
                    {
                      title: "Cookies necessários",
                      description: "Essenciais para o funcionamento do site. Não podem ser desativados.",
                      linkedCategory: "necessary"
                    },
                    {
                      title: "Cookies de análise",
                      description: "Nos ajudam a entender como você usa o site, de forma anônima.",
                      linkedCategory: "analytics"
                    },
                    {
                      title: "Cookies de marketing",
                      description: "Utilizados por serviços como YouTube e Google Maps.",
                      linkedCategory: "marketing"
                    }
                  ]
                }
              }
            }
          }
        })
      }
      if (attempts > 50) {
        clearInterval(interval)
        console.error("CookieConsent failed to load after 5 seconds")
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return null
}
