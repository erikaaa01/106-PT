// Global variables
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
const today = new Date().toISOString().split('T')[0];

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    const routes = {
        'index.html': displayFeaturedHotels,
        '': displayFeaturedHotels,
        'hotel_rooms.html': displayHotelPage,
        'account.html': displayUserBookings
    };
    
    if (routes[path]) {
        routes[path]();
    }
});

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatCurrency(amount) {
    return `₱${amount.toLocaleString()}`;
}

// Home page - display featured hotels
function displayFeaturedHotels() {
    const hotelCardsContainer = document.querySelector('.hotel-cards');
    if (!hotelCardsContainer) return;
    
    hotelCardsContainer.innerHTML = hotels.map(hotel => `
        <div class="hotel-card">
            <img src="${Array.isArray(hotel.image) ? hotel.image[0] : hotel.image}" 
                 alt="${hotel.name}" 
                 loading="lazy">
            <h3>${hotel.name}</h3>
            <p>${hotel.description.substring(0, 100)}...</p>
            <a href="hotel_rooms.html?id=${hotel.id}" class="hotel-button">View Rooms</a>
        </div>
    `).join('');
}

// Hotel page controller
function displayHotelPage() {
    console.log("displayHotelPage called");
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');
    
    if (hotelId) {
        displayHotelDetails(hotelId);
    } else {

// Display detailed view for a specific hotel
function displayHotelDetails(hotelId) {
    const hotel = hotels.find(h => h.id == hotelId);
    if (!hotel) return displayAllHotels();

    // Set basic hotel info
    document.getElementById('hotel-name').textContent = hotel.name;
    document.getElementById('hotel-description').textContent = hotel.description;
    document.getElementById('hotel-location').textContent = hotel.location;
    
    // Set star rating
    document.getElementById('hotel-rating-stars').innerHTML = 
        '★'.repeat(hotel.starRating) + '☆'.repeat(5 - hotel.starRating);
    
    // Set hotel images
    setupHotelGallery(hotel);
    
    // Set highlights, facilities, offers
    populateHotelInfo(hotel);
    
    // Set reviews
    setupReviews(hotel);
    
    // Set rooms
    setupRooms(hotel);
    
    // Initialize map
    initMap(hotel);
    
    // Setup tab switching
    setupTabs();
}

// Setup hotel image gallery
function setupHotelGallery(hotel) {
    const mainImg = document.getElementById('main-hotel-img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (hotel.image && hotel.image.length > 0) {
        mainImg.src = Array.isArray(hotel.image) ? hotel.image[0] : hotel.image;
        
        for (let i = 0; i < Math.min(4, hotel.image.length); i++) {
            thumbnails[i].src = Array.isArray(hotel.image) ? hotel.image[i+1] : hotel.image;
            thumbnails[i].addEventListener('click', () => {
                mainImg.src = thumbnails[i].src;
            });
        }
    }
}

// Populate hotel information sections
function populateHotelInfo(hotel) {
    // Highlights
    const highlightsList = document.getElementById('hotel-highlights');
    highlightsList.innerHTML = hotel.highlights.map(h => `<li>${h}</li>`).join('');
    
    // Facilities
    const facilitiesList = document.getElementById('hotel-facilities');
    facilitiesList.innerHTML = hotel.facilities.map(f => `<li>${f}</li>`).join('');
    
    // Offers
    const offersContainer = document.getElementById('hotel-offers');
    offersContainer.innerHTML = Object.entries(hotel.offers).map(([category, items]) => `
        <div>
            <h4>${category}</h4>
            <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
    `).join('');
}

// Setup reviews section
function setupReviews(hotel) {
    const averageRating = hotel.reviews.reduce((sum, review) => sum + review.rating, 0) / hotel.reviews.length;
    document.getElementById('average-rating').textContent = averageRating.toFixed(1);
    document.getElementById('review-count').textContent = `(${hotel.reviews.length} reviews)`;
    
    const reviewsContainer = document.getElementById('hotel-reviews');
    reviewsContainer.innerHTML = hotel.reviews.map(review => `
        <div class="review">
            <div class="review-header">
                <h4>${review.title}</h4>
                <span class="review-rating">${review.rating.toFixed(1)}</span>
            </div>
            <div class="review-author">${review.author} • ${review.date}</div>
            <p class="review-content">${review.content}</p>
        </div>
    `).join('');
}

function setupRooms(hotel) {
    const roomsContainer = document.getElementById('rooms-container');
    roomsContainer.innerHTML = hotel.rooms.map(room => `
        <div class="room-card">
            <div class="room-card-image">
                <img src="${Array.isArray(room.image) ? room.image[0] : room.image}" 
                     alt="${room.type}">
                <button class="view-room-details" 
                        data-room-id="${room.id}"
                        data-hotel-id="${hotel.id}">
                    View Details
                </button>
            </div>
            <div class="room-card-info">
                <h3>${room.type}</h3>
                <p>${room.description.substring(0, 100)}...</p>
                <div class="room-card-price">
                    ${formatCurrency(room.price)} per night
                </div>
                <button class="book-room-btn" 
                        data-room-id="${room.id}"
                        data-hotel-id="${hotel.id}"
                        ${room.booked ? 'disabled' : ''}>
                    ${room.booked ? 'Booked' : 'Book Now'}
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to room buttons
    document.querySelectorAll('.view-room-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const hotelId = this.dataset.hotelId;
            const roomId = this.dataset.roomId;
            const hotel = hotels.find(h => h.id === hotelId);
            showRoomDetails(hotel, roomId);
        });
    });
    
    document.querySelectorAll('.book-room-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', function() {
            const hotelId = this.dataset.hotelId;
            const roomId = this.dataset.roomId;
            const hotel = hotels.find(h => h.id === hotelId);
            showBookingForm(hotel.id, roomId);
        });
    });
}

// Initialize Leaflet map
function initMap(hotel) {
    const mapContainer = document.getElementById('hotel-map');
    if (!mapContainer || !hotel.coordinates) return;

    const { lat, lng } = hotel.coordinates;
    const map = L.map('hotel-map').setView([lat, lng], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>${hotel.name}</b><br>${hotel.location}`)
        .openPopup();
}

// Setup tab switching
    function setupTabs() {
        const tabContainer = document.querySelector('.hotel-tabs');
        if (!tabContainer) return;
        tabContainer.addEventListener('click', function(event) {
            const clickedBtn = event.target.closest('.tab-btn');
            if (!clickedBtn) return;

            const tabBtns = tabContainer.querySelectorAll('.tab-btn');
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

            clickedBtn.classList.add('active');
            const tabId = clickedBtn.dataset.tab;
            const tabContent = document.getElementById(`${tabId}-tab`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
        console.log("setupTabs event delegation initialized");
    }
// Display all hotels list
function displayAllHotels() {
    const hotelDetailsContainer = document.querySelector('.hotel-details');
    if (!hotelDetailsContainer) return;
    
    hotelDetailsContainer.innerHTML = `
        <h2>All Hotels</h2>
        <div class="hotels-grid">
            ${hotels.map(hotel => `
                <div class="hotel-item">
                    <img src="${Array.isArray(hotel.image) ? hotel.image[0] : hotel.image}" 
                         alt="${hotel.name}">
                    <h3>${hotel.name}</h3>
                    <p>${hotel.description.substring(0, 150)}...</p>
                    <a href="hotel_rooms.html?id=${hotel.id}" class="cta-button">
                        View Rooms
                    </a>
                </div>
            `).join('')}
        </div>
    `;
}

// Show room details modal
function showRoomDetails(hotel, roomId) {
    const room = hotel.rooms.find(r => r.id == roomId);
    if (!room) return;

    const roomModal = document.getElementById('roomModal');
    
    // Set room details
    document.getElementById('room-type').textContent = room.type;
    document.getElementById('room-description').textContent = room.description;
    document.getElementById('room-price').textContent = formatCurrency(room.price);
    
    // Set room images
    const roomMainImg = document.getElementById('room-main-img');
    const roomThumbnails = document.querySelector('.room-thumbnails');
    roomThumbnails.innerHTML = '';
    
    if (Array.isArray(room.image)) {
        roomMainImg.src = room.image[0];
        
        room.image.slice(1).forEach((img, i) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.className = 'room-thumbnail';
            thumb.alt = `${room.type} thumbnail ${i+1}`;
            thumb.addEventListener('click', () => {
                roomMainImg.src = img;
            });
            roomThumbnails.appendChild(thumb);
        });
    } else {
        roomMainImg.src = room.image;
    }
    
    // Show modal
    roomModal.style.display = 'flex';
    
    // Setup modal close handlers
    document.querySelector('.close-room-modal').addEventListener('click', () => {
        roomModal.style.display = 'none';
    }, { once: true });
    
    roomModal.addEventListener('click', (e) => {
        if (e.target === roomModal) {
            roomModal.style.display = 'none';
        }
    }, { once: true });
    
    // Setup book now button
    document.querySelector('.book-room-btn').addEventListener('click', () => {
        roomModal.style.display = 'none';
        showBookingForm(hotel.id, room.id);
    }, { once: true });
}

// Show booking form modal
function showBookingForm(hotelId, roomId) {
    if (document.querySelector('.modal-overlay')) return;

    const hotel = hotels.find(h => h.id == hotelId);
    const room = hotel.rooms.find(r => r.id == roomId);
    if (!hotel || !room || room.booked) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    overlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Book ${room.type} at ${hotel.name}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="bookingForm">
                    <input type="hidden" id="hotelId" value="${hotelId}">
                    <input type="hidden" id="roomId" value="${roomId}">
                    
                    <div class="form-group">
                        <label for="name">Full Name:</label>
                        <input type="text" id="name" required>
                        <div class="error-message" id="name-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" required>
                        <div class="error-message" id="email-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="tel" id="phone" required>
                        <div class="error-message" id="phone-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="checkin">Check-in Date:</label>
                        <input type="date" id="checkin" min="${today}" required>
                        <div class="error-message" id="checkin-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="checkout">Check-out Date:</label>
                        <input type="date" id="checkout" required>
                        <div class="error-message" id="checkout-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="guests">Number of Guests:</label>
                        <input type="number" id="guests" min="1" max="${room.capacity}" value="1" required>
                        <div class="error-message" id="guests-error"></div>
                    </div>
                    
                    <div class="price-summary">
                        <h4>Price Summary</h4>
                        <p>Room Price: ${formatCurrency(room.price)} per night</p>
                        <p id="nights-count">Nights: 0</p>
                        <p id="total-price">Total: ₱0</p>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="cancel-button">Cancel</button>
                <button type="submit" form="bookingForm" class="submit-button">Confirm Booking</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Setup date calculations
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    checkinInput.addEventListener('change', function() {
        checkoutInput.min = this.value;
        calculateTotal();
    });
    
    checkoutInput.addEventListener('change', calculateTotal);
    
    function calculateTotal() {
        if (checkinInput.value && checkoutInput.value) {
            const checkin = new Date(checkinInput.value);
            const checkout = new Date(checkoutInput.value);
            const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
            
            document.getElementById('nights-count').textContent = `Nights: ${nights}`;
            document.getElementById('total-price').textContent = `Total: ${formatCurrency(room.price * nights)}`;
        }
    }

    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            const submitBtn = document.querySelector('.submit-button');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            processBooking(hotelId, roomId);
        }
    });
    
    // Modal close handlers
    function closeModal() {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
    
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.querySelector('.cancel-button').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => e.target === overlay && closeModal());

    // Form validation
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const guests = document.getElementById('guests').value;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });

        // Validation checks
        if (!name) {
            document.getElementById('name-error').textContent = 'Please enter your name';
            isValid = false;
        }

        if (!email) {
            document.getElementById('email-error').textContent = 'Please enter your email';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        }

        if (!phone) {
            document.getElementById('phone-error').textContent = 'Please enter your phone number';
            isValid = false;
        } else if (!/^[0-9+() -]{10,}$/.test(phone)) {
            document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
            isValid = false;
        }

        if (!checkin) {
            document.getElementById('checkin-error').textContent = 'Please select check-in date';
            isValid = false;
        }
        
        if (!checkout) {
            document.getElementById('checkout-error').textContent = 'Please select check-out date';
            isValid = false;
        } else if (checkout <= checkin) {
            document.getElementById('checkout-error').textContent = 'Check-out date must be after check-in date';
            isValid = false;
        }

        if (!guests || guests < 1 || guests > room.capacity) {
            document.getElementById('guests-error').textContent = `Please enter between 1 and ${room.capacity} guests`;
            isValid = false;
        }

        return isValid;
    }
}

// Process booking
function processBooking(hotelId, roomId) {
    const hotel = hotels.find(h => h.id == hotelId);
    const room = hotel.rooms.find(r => r.id == roomId);
    
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    
    const booking = {
        id: Date.now().toString(),
        hotelId,
        roomId,
        hotelName: hotel.name,
        roomType: room.type,
        customerName: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        checkin,
        checkout,
        guests: parseInt(document.getElementById('guests').value),
        price: room.price,
        totalPrice: room.price * nights,
        image: Array.isArray(room.image) ? room.image[0] : room.image,
        bookingDate: new Date().toISOString()
    };
    
    // Mark room as booked
    room.booked = true;
    
    // Save booking
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('hotels', JSON.stringify(hotels));
    
    // Show confirmation
    showBookingConfirmation(booking);
    
    // Close the modal
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
    
    // Refresh display if on hotel_rooms.html
    if (window.location.pathname.includes('hotel_rooms.html')) {
        displayHotelPage();
    }
}

// Show booking confirmation
function showBookingConfirmation(booking) {
    const confirmation = `
        <div class="confirmation-overlay">
            <div class="confirmation-modal">
                <h3>Booking Confirmed!</h3>
                <div class="confirmation-details">
                    <p><strong>Hotel:</strong> ${booking.hotelName}</p>
                    <p><strong>Room:</strong> ${booking.roomType}</p>
                    <p><strong>Dates:</strong> ${formatDate(booking.checkin)} to ${formatDate(booking.checkout)}</p>
                    <p><strong>Guests:</strong> ${booking.guests}</p>
                    <p><strong>Total Price:</strong> ${formatCurrency(booking.totalPrice)}</p>
                    <p><strong>Booking Reference:</strong> ${booking.id}</p>
                </div>
                <button class="confirmation-close">OK</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmation);
    
    document.querySelector('.confirmation-close').addEventListener('click', () => {
        document.querySelector('.confirmation-overlay').remove();
    });
}
// Display user bookings
function displayUserBookings() {
    const bookingsContainer = document.querySelector('.booking-list');
    if (!bookingsContainer) return;
    
    if (bookings.length === 0) {
        bookingsContainer.innerHTML = '<p class="no-bookings">You have no bookings yet.</p>';
        return;
    }
    
    bookingsContainer.innerHTML = bookings.map(booking => {
        const nights = Math.ceil((new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24));
        
        return `
            <div class="booking-card">
                <img src="${booking.image}" 
                     alt="${booking.roomType}" 
                     loading="lazy">
                <div class="booking-info">
                    <h3>${booking.hotelName}</h3>
                    <p><strong>Room Type:</strong> ${booking.roomType}</p>
                    <p><strong>Dates:</strong> ${formatDate(booking.checkin)} - ${formatDate(booking.checkout)} (${nights} nights)</p>
                    <p><strong>Guests:</strong> ${booking.guests}</p>
                    <p><strong>Total Price:</strong> ${formatCurrency(booking.totalPrice || booking.price * nights)}</p>
                    <p><strong>Booked on:</strong> ${formatDate(booking.bookingDate)}</p>
                    <p class="booking-reference"><strong>Reference:</strong> ${booking.id}</p>
                    <div class="booking-actions">
                        <button class="delete-booking" data-booking-id="${booking.id}">Delete Booking</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-booking').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.dataset.bookingId;
            deleteBooking(bookingId);
        });
    });
}

// Delete booking function
function deleteBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        // Find the booking to get hotel and room info
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) return;
        
        const booking = bookings[bookingIndex];
        
        // Mark room as available again
        const hotel = hotels.find(h => h.id === booking.hotelId);
        if (hotel) {
            const room = hotel.rooms.find(r => r.id === booking.roomId);
            if (room) {
                room.booked = false;
                localStorage.setItem('hotels', JSON.stringify(hotels));
            }
        }
        
        // Remove booking from array
        bookings.splice(bookingIndex, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        // Refresh display
        displayUserBookings();
    }
}
    }