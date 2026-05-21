import { useEffect, useState, useRef } from "react";
import "../styles/informative-card.css";

export function InformativeCard({
  slides = [],
  showClose = false,
}) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const [showOverlayIcon, setShowOverlayIcon] = useState(false);

  const [overlayType, setOverlayType] = useState("pause");

  const [progressKey, setProgressKey] = useState(0);

  const [isVisible, setIsVisible] = useState(true);

  const timeoutRef = useRef(null);

  const totalSlides = slides.length;

useEffect(() => {

  if (isPaused) return;

const timeout = setTimeout(() => {

  setCurrentSlide((prev) => {

    const nextSlide =
      prev < totalSlides - 1
        ? prev + 1
        : 0;

    setProgressKey(prev => prev + 1);

    return nextSlide;

  });

}, 7000);

return () => clearTimeout(timeout);

}, [currentSlide, isPaused, totalSlides]);

const handleNext = () => {

  if (currentSlide < totalSlides - 1) {

    setCurrentSlide(currentSlide + 1);

    setProgressKey(prev => prev + 1);

  } else {

    setIsVisible(false);

    console.log("Componente cerrado");

  }

};

const handleSeeLater = () => {

  localStorage.setItem(
    "showInformativeCardLater",
    "true"
  );

  setIsVisible(false);

  console.log(
    "Usuario quiere ver el componente en la siguiente sesión"
  );
};

const handleImageClick = () => {

  const nextPaused = !isPaused;

  setIsPaused(nextPaused);

  setOverlayType(
    nextPaused ? "pause" : "play"
  );

  setShowOverlayIcon(false);

  requestAnimationFrame(() => {
    setShowOverlayIcon(true);
  });

  setProgressKey(prev => prev + 1);

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
                className="image-container"
                onClick={handleImageClick}
                >

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="card-image"
                />
                  {showOverlayIcon && currentSlide === index && (
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