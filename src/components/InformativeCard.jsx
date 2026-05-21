import { useEffect, useState, useRef } from "react";
import "../styles/informative-card.css";

export function InformativeCard({
  slides = [],
  showClose = false,
  enableMediaControls = false,
}) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const [showOverlayIcon, setShowOverlayIcon] = useState(false);

  const [overlayType, setOverlayType] = useState("pause");

  const [progressKey, setProgressKey] = useState(0);

  const [isVisible, setIsVisible] = useState(true);

  const timeoutRef = useRef(null);
  const slideStartTimeRef = useRef(Date.now()); // Momento en que comenzó el slide actual
  const remainingTimeRef = useRef(7000);        // Tiempo restante antes de avanzar

  const totalSlides = slides.length;

  const SLIDE_DURATION = 7000;

  // FIX #1: Cleanup del timeoutRef al desmontar el componente
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // FIX PAUSE: El timer ahora respeta el tiempo ya transcurrido al reanudar,
  // en lugar de reiniciarse desde 7000ms cada vez que cambia isPaused.
  useEffect(() => {

    clearTimeout(timeoutRef.current);

    if (isPaused) {
      // Guardar cuánto tiempo queda al pausar
      const elapsed = Date.now() - slideStartTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      return;
    }

    // Al reanudar (o al cambiar de slide), registrar el momento de inicio
    slideStartTimeRef.current = Date.now();

    timeoutRef.current = setTimeout(() => {

      setCurrentSlide((prev) => {
        const nextSlide = prev < totalSlides - 1 ? prev + 1 : 0;
        setProgressKey(p => p + 1);
        return nextSlide;
      });

      // Resetear tiempo restante para el siguiente slide
      remainingTimeRef.current = SLIDE_DURATION;

    }, remainingTimeRef.current);

    return () => clearTimeout(timeoutRef.current);

  }, [currentSlide, isPaused, totalSlides]);

  const handleNext = () => {

    if (currentSlide < totalSlides - 1) {

      remainingTimeRef.current = SLIDE_DURATION; // Resetear para el nuevo slide
      setCurrentSlide(currentSlide + 1);
      setProgressKey(prev => prev + 1);

    } else {

      setIsVisible(false);

      console.log("Componente cerrado");

    }

  };

  const handleSeeLater = () => {

    // FIX #3: localStorage con try/catch para entornos SSR o sin soporte
    try {
      localStorage.setItem(
        "showInformativeCardLater",
        "true"
      );
    } catch (e) {
      console.warn("localStorage no disponible:", e);
    }

    setIsVisible(false);

    console.log(
      "Usuario quiere ver el componente en la siguiente sesión"
    );

  };

  const handleImageClick = () => {

    const nextPaused = !isPaused;

    setIsPaused(nextPaused);

    setOverlayType(nextPaused ? "pause" : "play");

    setShowOverlayIcon(false);

    requestAnimationFrame(() => {
      setShowOverlayIcon(true);
    });

    // El overlay icon desaparece tras 2s (timeoutRef reutilizado solo para esto)
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setShowOverlayIcon(false);
    }, 2000);

  };

  if (!isVisible) return null;

  return (
    <div className="informative-card">

      {showClose && (
        <button
          className="close-button"
          onClick={() => setIsVisible(false)}
          // FIX #7: aria-label para accesibilidad en teclado y lectores de pantalla
          aria-label="Cerrar"
        >
          ×
        </button>
      )}

      {slides[currentSlide]?.tagText && (
        <a
          href={slides[currentSlide]?.tagLink}
          className="floating-card-tag"
        >
          {slides[currentSlide]?.tagText}
        </a>
      )}

      <div className="slider-wrapper">

        <div
          className="slider-container"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >

          {slides.map((slide, index) => (
            <div className="slide" key={index}>

              <div
                // FIX #5: Clase .media-enabled aplicada condicionalmente en JSX
                className={`image-container ${enableMediaControls ? "media-enabled" : ""}`}
                onClick={
                  enableMediaControls
                    ? handleImageClick
                    : undefined
                }
              >

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="card-image"
                />

                {enableMediaControls &&
                  showOverlayIcon &&
                  currentSlide === index && (
                    <div className="media-overlay">

                      {overlayType === "pause" ? (
                        <div className="pause-icon">
                          ❚❚
                        </div>
                      ) : (
                        <div className="play-icon">
                          ▶
                        </div>
                      )}

                    </div>
                  )}

              </div>

              {totalSlides > 1 && (
                <div className="pagination-dots">

                  {slides.map((_, dotIndex) => (

                    <div
                      key={dotIndex}
                      onClick={() => {

                        remainingTimeRef.current = SLIDE_DURATION; // Resetear para el slide seleccionado
                        setCurrentSlide(dotIndex);
                        setProgressKey(prev => prev + 1);
                        setShowOverlayIcon(false);

                      }}
                      className={`pagination-item ${
                        dotIndex < currentSlide
                          ? "completed"
                          : dotIndex === currentSlide
                          ? "progress"
                          : "pending"
                      }`}
                    >

                      {dotIndex === currentSlide ? (
                        <div
                          key={`${currentSlide}-${progressKey}-${isPaused}`}
                          className={`progress-bar-fill ${
                            isPaused ? "paused" : ""
                          }`}
                        />
                      ) : null}

                    </div>

                  ))}

                </div>
              )}

              <h3 className="card-title">
                {slide.title}
              </h3>

              <p className="card-description">
                {slide.description}
              </p>

            </div>
          ))}

        </div>

      </div>

      <div className="button-group">

        <button
          className="primary-button"
          onClick={handleNext}
        >

          {currentSlide === totalSlides - 1
            ? "Cerrar"
            : `Siguiente ${currentSlide + 1}/${totalSlides}`}

        </button>

        <button
          className="secondary-button"
          onClick={handleSeeLater}
        >
          Ver después
        </button>

      </div>

    </div>
  );
}