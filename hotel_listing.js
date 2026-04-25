document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters
    const locationFilter = document.getElementById('location-filter');
    const priceFilter = document.getElementById('price-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const resetButton = document.getElementById('reset-filters');
    
    // Display all hotels initially
    displayHotels(hotels);
    
    // Add event listeners for filters
    locationFilter.addEventListener('change', filterHotels);
    priceFilter.addEventListener('change', filterHotels);
    ratingFilter.addEventListener('change', filterHotels);
    resetButton.addEventListener('click', resetFilters);
    
    function filterHotels() {
        const locationValue = locationFilter.value;
        const priceValue = priceFilter.value;
        const ratingValue = ratingFilter.value;
        
        const filteredHotels = hotels.filter(hotel => {
            // Location filter
            const locationMatch = !locationValue || 
                hotel.location.includes(locationValue);
            
            // Price filter (checks if any room is below max price)
            const priceMatch = !priceValue || 
                hotel.rooms.some(room => room.price <= parseInt(priceValue));
            
            // Rating filter
            const ratingMatch = !ratingValue || 
                hotel.starRating >= parseInt(ratingValue);
            
            return locationMatch && priceMatch && ratingMatch;
        });
        
        displayHotels(filteredHotels);
    }
    
    function resetFilters() {
        locationFilter.value = '';
        priceFilter.value = '';
        ratingFilter.value = '';
        displayHotels(hotels);
    }
    
    function displayHotels(hotelsToDisplay) {
        const container = document.getElementById('hotel-cards-container');
        
        container.innerHTML = hotelsToDisplay.map(hotel => `
            <div class="hotel-card">
                <img src="${Array.isArray(hotel.image) ? hotel.image[0] : hotel.image}" 
                     alt="${hotel.name}" 
                     loading="lazy">
                <div class="hotel-card-content">
                    <h3>${hotel.name}</h3>
                    <div class="hotel-rating">${'★'.repeat(hotel.starRating)}${'☆'.repeat(5 - hotel.starRating)}</div>
                    <p class="hotel-location">${hotel.location}</p>
                    <p class="hotel-price">From ${formatCurrency(getStartingPrice(hotel))}</p>
                    <p class="hotel-description">${hotel.description.substring(0, 100)}...</p>
                    <a href="hotel_rooms.html?id=${hotel.id}" class="view-rooms-button">View Rooms</a>
                </div>
            </div>
        `).join('');
    }
    
    function getStartingPrice(hotel) {
        return Math.min(...hotel.rooms.map(room => room.price));
    }
    
    function formatCurrency(amount) {
        return `₱${amount.toLocaleString()}`;
    }
});