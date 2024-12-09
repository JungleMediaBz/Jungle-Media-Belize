//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the tour parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tourParam = urlParams.get('tour');

    // If there's a tour parameter, select it in the dropdown
    if (tourParam) {
        const tourSelect = document.getElementById('tour');
        if (tourSelect) {
            tourSelect.value = tourParam;
        }
    }

    // Add form submission handler
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(bookingForm);
            const bookingData = Object.fromEntries(formData);

            // Get tour-specific packing list
            const packingList = getPackingList(bookingData.tour);

            // Simulate sending confirmation email
            sendConfirmationEmail(bookingData, packingList);

            // Show success message
            alert('Booking successful! Check your email for confirmation and packing list.');
        });
    }
});

// Function to get tour-specific packing list
function getPackingList(tour) {
    const packingLists = {
        'belize-zoo': [
            'Comfortable walking shoes',
            'Camera',
            'Sunscreen',
            'Insect repellent',
            'Water bottle',
            'Light rain jacket',
            'Hat or cap'
        ],
        'baboon-sanctuary': [
            'Hiking shoes',
            'Binoculars',
            'Camera',
            'Sunscreen',
            'Insect repellent',
            'Water bottle',
            'Light rain jacket',
            'Long pants',
            'Hat or cap'
        ],
        'zipline': [
            'Closed-toe shoes',
            'Comfortable active wear',
            'Hair tie for long hair',
            'Sunscreen',
            'Insect repellent',
            'Water bottle',
            'Light rain jacket',
            'GoPro or action camera (optional)'
        ],
        'archaeological': [
            'Sturdy hiking shoes',
            'Camera',
            'Sunscreen',
            'Insect repellent',
            'Water bottle',
            'Light rain jacket',
            'Hat or cap',
            'Long pants',
            'Small backpack',
            'Snacks'
        ]
    };

    return packingLists[tour] || [];
}

// Function to simulate sending confirmation email
function sendConfirmationEmail(bookingData, packingList) {
    // This is a simulation - in a real application, 
    // you would connect to your backend service to send actual emails
    console.log('Booking Confirmation:', {
        ...bookingData,
        packingList: packingList
    });
}