// Search Popup Functions
function openSearchPopup(event) {
  event.preventDefault();
  document.getElementById('searchPopup').style.display = 'flex';
}

function closeSearchPopup() {
  document.getElementById('searchPopup').style.display = 'none';
}



// Initialize Slick Sliders
$(document).ready(function () {
  // Slider
  $('.slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
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
  });

  // Featured Slider Logo
  $('.featured-slider-logo').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
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
  });

  // Slider1
  $('.slider1').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
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
  });
});

 const filterButtons = document.querySelectorAll('#filterBar button');
  const authorItems = document.querySelectorAll('.author-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const letter = button.getAttribute('data-letter');

      authorItems.forEach(item => {
        const name = item.getAttribute('data-name').toLowerCase();
        const firstChar = name.charAt(0);

        if (
          letter === 'all' ||
          (letter === 'num' && !isNaN(firstChar)) ||
          firstChar === letter
        ) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });