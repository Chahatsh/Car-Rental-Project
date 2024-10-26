// Toggle the navigation menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// ScrollReveal configuration
const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h1", scrollRevealOption);
ScrollReveal().reveal(".header__container form", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".header__container img", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".range__card", { duration: 1000, interval: 500 });
ScrollReveal().reveal(".location__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".location__content .section__header", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".location__content p", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".location__content .location__btn", { ...scrollRevealOption, delay: 1500 });
ScrollReveal().reveal(".story__card", { ...scrollRevealOption, interval: 500 });

// Swiper configuration
const selectCards = document.querySelectorAll(".select__card");
selectCards[0].classList.add("show__info");

const price = ["225", "455", "275", "625", "395"];
const priceEl = document.getElementById("select-price");

function updateSwiperImage(eventName, args) {
  if (eventName === "slideChangeTransitionStart") {
    const index = args && args[0].realIndex;
    priceEl.innerText = price[index];
    selectCards.forEach(item => item.classList.remove("show__info"));
    selectCards[index].classList.add("show__info");
  }
}

const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    depth: 500,
    modifier: 1,
    scale: 0.75,
    slideShadows: false,
    stretch: -100,
  },
  onAny(event, ...args) {
    updateSwiperImage(event, args);
  },
});

// Banner duplication
const banner = document.querySelector(".banner__wrapper");
const bannerContent = Array.from(banner.children);

bannerContent.forEach(item => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});

// Additional ScrollReveal configuration
ScrollReveal().reveal(".download__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".download__content .section__header", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".download__links", { ...scrollRevealOption, delay: 1000 });



let cardData = [];

// Fetch the CSV file and parse it
function fetchCSV() {
    Papa.parse('Lounge.csv', {
        download: true,
        header: true,
        complete: function(results) {
            cardData = results.data;
        },
        error: function(error) {
            console.error('Error fetching CSV:', error);
        }
    });
}

fetchCSV();

// Filter locations based on input
function filterLocations() {
    const searchValue = document.getElementById("locationSearch").value.toLowerCase();
    const dropdown = document.getElementById("locationDropdown");
    dropdown.innerHTML = '';

    const filteredLocations = cardData.filter(car => car.Location && car.Location.toLowerCase().includes(searchValue));

    if (filteredLocations.length > 0 && searchValue.length > 0) {
        dropdown.style.display = 'block';  

        filteredLocations.forEach(car => {
            const li = document.createElement('li');
            li.textContent = car.Location;
            li.addEventListener('click', () => displayLocationDetails(car.Location));
            dropdown.appendChild(li);
        });
    } else {
        dropdown.style.display = 'none';  
    }
}

// Display car details based on selected location
function displayLocationDetails(selectedLocation) {
    const dropdown = document.getElementById("locationDropdown");
    const locationDetails = document.getElementById("locationDetails");
    const carInfoList = document.getElementById("carInfoList");

    dropdown.style.display = 'none';  

    const carsAtLocation = cardData.filter(car => car.Location === selectedLocation);

    carInfoList.innerHTML = '';

    carsAtLocation.forEach(car => {
        const carInfoCard = document.createElement('div');
        carInfoCard.classList.add('car-info-card');

        const carModel = document.createElement('h4');
        carModel.textContent = `Model: ${car["Car Make/Model"]}`;

        const carYear = document.createElement('p');
        carYear.textContent = `Year: ${car.Year}`;

        const rentalPrice = document.createElement('p');
        rentalPrice.textContent = `Daily Rental Price: $${car["Daily Rental Price ($)"]}`;

        const fuelType = document.createElement('p');
        fuelType.textContent = `Fuel Type: ${car["Fuel Type"]}`;

        const transmissionType = document.createElement('p');
        transmissionType.textContent = `Transmission: ${car["Transmission"]}`;

        const availabilityStatus = document.createElement('p');
        availabilityStatus.textContent = `Availability: ${car["Availability"]}`;

        // Append details to the car info card
        carInfoCard.appendChild(carModel);
        carInfoCard.appendChild(carYear);
        carInfoCard.appendChild(rentalPrice);
        carInfoCard.appendChild(fuelType);
        carInfoCard.appendChild(transmissionType);
        carInfoCard.appendChild(availabilityStatus);

        // Append car info card to the car info list
        carInfoList.appendChild(carInfoCard);
    });

    locationDetails.style.display = 'block';  
}
