"use client"

import { useEffect } from "react"

const videos = [
  {
    src: "https://www.youtube.com/embed/NTBkkZvksiY?enablejsapi=1",
    title: "Pediram para você ir à delegacia apenas para conversar?",
    desc: "Saiba o que fazer e como se proteger nessa situação.",
  },
  {
    src: "https://www.youtube.com/embed/bpqq2GIl1zk?enablejsapi=1",
    title: "Três sinais de que você precisa de um advogado criminalista hoje",
    desc: "Não espere o problema se agravar. Conheça os alertas.",
  },
]

export function Videos() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        // When any YouTube video starts playing (state 1 represents playing)
        if (data && data.event === 'onStateChange' && data.info === 1) {
          const iframes = document.querySelectorAll('iframe');
          iframes.forEach((iframe) => {
            if (iframe.contentWindow && iframe.contentWindow !== event.source) {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
                '*'
              );
            }
          });
        }
      } catch (err) {
        // Ignore parsing errors for non-YouTube messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <section
      id="conteudo"
      className="section"
      style={{ background: "#FAFAFA", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}
    >
      <div className="section-inner">
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow fade-up">Conteúdo</span>
          <h2 className="section-title fade-up delay-1">Entenda seus direitos.</h2>
          <div className="title-divider fade-up delay-2" style={{ marginBottom: 12 }} />
          <p
            className="fade-up delay-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              color: "#6B6B6B",
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Conteúdo jurídico direto ao ponto, criado pela Dra. Graciela.
          </p>
        </div>

        {/* Video grid — 2 col desktop/tablet, 1 col mobile */}
        <div
          className="videos-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {videos.map((v, i) => (
            <div
              key={i}
              className={`fade-up delay-${i + 1}`}
              style={{
                background: "#FAFAFA",
                border: "1px solid #EBEBEB",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                borderTop: "3px solid #6B0E08",
              }}
            >
              {/* Video embed */}
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  src={v.src}
                  title={v.title}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>

              {/* Caption */}
              <div style={{ padding: 24 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#0D0D0D",
                    lineHeight: 1.4,
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "#6B6B6B",
                    lineHeight: 1.6,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
