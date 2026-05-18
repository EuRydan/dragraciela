'use client' // Avisa o computador para rodar a animação no navegador

import React from 'react'
import { ShaderGradient } from '@shadergradient/react'

export function Hero() {
  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', // Faz a Hero ocupar o ecrã inteiro
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden',
      backgroundColor: '#000000'
    }}>
      
      {/* A SUA ANIMAÇÃO BONITA (Fundo) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <ShaderGradient  
          animate="on"  
          axesHelper="off"  
          brightness={1.5}  
          cAzimuthAngle={170}  
          cDistance={3.5}  
          cPolarAngle={70}  
          cameraZoom={1}  
          color1="#000000"  
          color2="#6B0E08"  
          color3="#ffffff"  
          destination="onCanvas"  
          embedMode="off"  
          envPreset="city"  
          format="gif"  
          fov={30}  
          frameRate={10}  
          gizmoHelper="hide"  
          grain="off"  
          lightType="3d"  
          pixelDensity={0.8}  
          positionX={0}  
          positionY={0.9}  
          positionZ={-0.3}  
          range="disabled"  
          rangeEnd={40}  
          rangeStart={0}  
          reflection={0.1}  
          rotationX={45}  
          rotationY={0}  
          rotationZ={0}  
          shader="defaults"  
          type="waterPlane"  
          uAmplitude={0}  
          uDensity={0.4}  
          uFrequency={0}  
          uSpeed={0.1}  
          uStrength={4.7}  
          uTime={0}  
          wireframe={false}
        />
      </div>

      {/* O TEXTO DO SEU SITE (Frente) */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        textAlign: 'center', 
        color: '#ffffff',
        padding: '20px'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: 0 }}>
          Graciela
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '15px', color: '#ccc' }}>
          O seu subtítulo ou frase de impacto vai aqui.
        </p>
        <button style={{
          marginTop: '25px',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          backgroundColor: '#6B0E08', // Vermelho escuro a combinar com a animação
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          transition: '0.2s'
        }}>
          Entrar em Contacto 🚀
        </button>
      </div>

    </section>
  )
}