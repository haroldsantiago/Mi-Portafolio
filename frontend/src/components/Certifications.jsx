import React, { useState, useEffect, useRef } from 'react'
import '../styles/Certifications.css'

function Certifications() {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [items, setItems] = useState([])
  const total = items.length
  const containerRef = useRef(null)

  const go = i => {
    if (total === 0) return
    if (i < 0) setIndex(total - 1)
    else if (i >= total) setIndex(0)
    else setIndex(i)
  }

  const prev = () => go(index - 1)
  const next = () => go(index + 1)

  useEffect(() => {
    if (index >= total && total > 0) setIndex(0)
  }, [total])

  useEffect(() => {
    const url = (process.env.PUBLIC_URL || '') + '/certifications/certifications.json'
    fetch(url)
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(d => ({
            src: (process.env.PUBLIC_URL || '') + (d.src || ''),
            alt: d.alt || 'Certificación',
            fullSrc: d.fullSrc
              ? (process.env.PUBLIC_URL || '') + d.fullSrc
              : ((process.env.PUBLIC_URL || '') + (d.src || '')),
          }))
          setItems(mapped)
        } else {
          setItems([])
        }
      })
      .catch(() => setItems([]))
  }, [])

  useEffect(() => {
    const handler = e => {
      if (lightbox) {
        if (e.key === 'Escape') setLightbox(null)
        return
      }
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, total, lightbox])

  return (
    <section
      id="certificaciones"
      className="certifications"
      ref={containerRef}
      tabIndex={0}
      aria-label="Certificaciones"
    >
      <h2 className="section-title">Certificaciones</h2>

      <div className="carousel">
        <button
          type="button"
          className="nav prev"
          onClick={prev}
          aria-label="Anterior"
          disabled={total <= 1}
        >
          ‹
        </button>

        <div className="viewport">
          <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
            {items.map((item, i) => (
              <div className="slide" key={i}>
                <img
                  src={item.src}
                  alt={item.alt}
                  onClick={() => setLightbox(item)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="nav next"
          onClick={next}
          aria-label="Siguiente"
          disabled={total <= 1}
        >
          ›
        </button>
      </div>

      <div className="dots" role="tablist" aria-label="Paginación">
        {items.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir a la certificación ${i + 1}`}
            aria-selected={i === index}
            role="tab"
          />
        ))}
      </div>

      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={lightbox.fullSrc}
            alt={lightbox.alt}
            className="lightbox-img"
          />
        </div>
      )}

      {items.length === 0 && (
        <p className="empty-hint">
          Agrega imágenes y un archivo <b>certifications.json</b> en <b>public/certifications</b>.
        </p>
      )}
    </section>
  )
}

export default Certifications
