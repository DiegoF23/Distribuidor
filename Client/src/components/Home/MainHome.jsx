// src/components/Home/MainHome.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/style.css";

const IMAGES = [
  "https://sagama-industrial.com/wp-content/uploads/equipos-necesarios-en-un-almacen.jpg",
  "https://diletradeco.com/wp-content/uploads/2024/04/istockphoto-1474043721-612x612-1.jpg",
  "https://spcgroup.com.mx/wp-content/uploads/2019/08/inventariocalidad_principal.jpg",
  "https://www.shiptify.com/hubfs/Capture%20d%E2%80%99%C3%A9cran%202024-07-09%20%C3%A0%2010.40.10.png",
  "https://media.licdn.com/dms/image/v2/C5612AQEqlQ7OHECMww/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1591197205858?e=2147483647&v=beta&t=nyWv-8RSIUVJthKpFXXME4rDMBwUJZ5kHNpFoo_w6uY",
  "https://www.cajeando.com/blog/wp-content/uploads/2022/06/como-mejorar-la-logistica-de-un-almacen.png",
];

// Carrusel minimalista (1 imagen) – lo usamos dos veces en paralelo.
function Carousel({ images, interval = 3500, startIndex = 0 }) {
  const [idx, setIdx] = useState(startIndex % images.length);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const go = (dir) =>
    setIdx((i) => (i + dir + images.length) % images.length);

  const container = {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    height: 260,
    background: "#eef2ff",
    boxShadow: "0 16px 40px rgba(2,8,23,.12)",
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform .6s ease",
  };
  const overlay = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(2,6,23,.05) 0%, rgba(2,6,23,.35) 100%)",
    pointerEvents: "none",
  };
  const navBtn = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: 10,
    transform: "translateY(-50%)",
    border: "none",
    borderRadius: 12,
    padding: "8px 10px",
    background: "rgba(255,255,255,.85)",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(2,8,23,.18)",
  });
  const dotsWrap = {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(2,6,23,.35)",
    backdropFilter: "blur(2px)",
  };
  const dot = (active) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: active ? "#fff" : "rgba(255,255,255,.55)",
  });

  return (
    <div
      style={container}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <img src={images[idx]} alt="Galería logística" style={imgStyle} />
      <div style={overlay} />
      <button aria-label="Anterior" style={navBtn("left")} onClick={() => go(-1)}>
        ‹
      </button>
      <button aria-label="Siguiente" style={navBtn("right")} onClick={() => go(1)}>
        ›
      </button>
      <div style={dotsWrap}>
        {images.map((_, i) => (
          <span key={i} style={dot(i === idx)} />
        ))}
      </div>
    </div>
  );
}

const MainHome = () => {
  // dividimos imágenes en dos listas (pares e impares) para que ambos carruseles muestren contenido distinto
  const [leftImgs, rightImgs] = useMemo(() => {
    const a = [], b = [];
    IMAGES.forEach((src, i) => (i % 2 === 0 ? a : b).push(src));
    return [a, b.length ? b : a]; // fallback si por alguna razón queda vacío
  }, []);

  const galleryWrap = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    alignItems: "stretch",
    marginBottom: 22,
  };
  const responsive = `@media (max-width: 920px) {
    .two-col-gallery { grid-template-columns: 1fr; }
  }`;

  const heroImage = {
    minHeight: 280,
    borderRadius: 18,
    background:
      "url('https://www.polypal.com/wp-content/uploads/2021/02/indocadores-gestion-almacen.webp') center/cover no-repeat",
  };

  return (
    <div className="container-page">
      {/* CSS responsivo embebido para el grid del carrusel */}
      <style>{responsive}</style>

      {/* Carruseles lado a lado */}
      <section className="two-col-gallery" style={galleryWrap}>
        <Carousel images={leftImgs} startIndex={0} />
        <Carousel images={rightImgs} startIndex={1} />
      </section>

      {/* HERO */}
      <section className="hero">
        <div className="card">
          <h1 className="hero__title">Logística y Distribución de Bebidas a Nivel Nacional</h1>
          <p className="hero__lead">
            Centro de logística con cobertura en todo el país. Gestión integral de
            <strong> stock</strong>, <strong>lotes</strong>, <strong>proveedores</strong> y <strong>clientes</strong>.
            Operamos para público mayorista y minorista con trazabilidad por código de lote y fechas de vencimiento.
          </p>
          <div className="mt-3 actions">
            <a className="btn" href="/lotes">Gestionar Lotes</a>
            <a className="btn ghost" href="/stock">Ver Stock</a>
          </div>
        </div>
        <div className="hero__image" aria-hidden style={heroImage} />
      </section>

      {/* KPIs */}
      <section className="kpis">
        <div className="kpi">
          <span>Centros logísticos</span>
          <span className="val">12</span>
        </div>
        <div className="kpi">
          <span>Camiones propios</span>
          <span className="val">+80</span>
        </div>
        <div className="kpi">
          <span>SKU activos</span>
          <span className="val">1.500</span>
        </div>
        <div className="kpi">
          <span>Clientes</span>
          <span className="val">+4.2K</span>
        </div>
      </section>
    </div>
  );
};

export default MainHome;
