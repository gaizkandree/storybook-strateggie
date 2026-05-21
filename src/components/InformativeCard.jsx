import { useEffect, useState } from "react";
import "../styles/informative-card.css";

export function InformativeCard({
  slides = [],
  showClose = false,
}) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = slides.length;

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) => {

        if (prev < totalSlides - 1) {
          return prev + 1;
        }

        return prev;

      });

    }, 7000);

    return () => clearInterval(interval);

  }, [totalSlides]);

  const handleNext = () => {

    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      alert("Cerrar");
    }

  };

  return (
    <div className="informative-card">

      {showClose && (
        <button className="close-button">
          ×
        </button>
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

              <div className="image-container">

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="card-image"
                />

                {slide.tagText && (
                  <a
                    href={slide.tagLink}
                    className="card-tag"
                  >
                    {slide.tagText}
                  </a>
                )}

              </div>

              {totalSlides > 1 && (
                <div className="pagination-dots">

                  {slides.map((_, dotIndex) => (

                    <div
                      key={dotIndex}
                      className={`pagination-item ${
                        dotIndex < currentSlide
                          ? "completed"
                          : dotIndex === currentSlide
                          ? "progress"
                          : "pending"
                      }`}
                    >

                      {dotIndex === currentSlide ? (
                        <div className="progress-bar-fill" />
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

        <button className="secondary-button">
          Ver después
        </button>

      </div>

    </div>
  );
}