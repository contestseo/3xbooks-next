import Slider from "react-slick";

export default function SeriesSlider({ series }) {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div>
        {/* React Slick Slider */}
        <Slider {...settings} className="slider1">
          {series.map((s, index) => (
            <div key={s._id || index} className="col-2">
              <div className="outer-box">
                <div className="book-image">
                  <img src={s.coverImage} alt={s.name} />
                </div>
                <h4 className="book-title mb-2 mt-3 text-center">{s.name}</h4>
                <a
                  href={`/series/${s.slug || s._id}`}
                  className="book-price"
                >
                  {s.books ? `${s.books.length} Books` : "View Series"}
                </a>
              </div>
            </div>
          ))}
        </Slider>
    </div>
  );
}
