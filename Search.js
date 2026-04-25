// Get references to the input field and suggestions container
const searchInput = document.querySelector('input[type="text"]');
const suggestionsContainer = document.getElementById('suggestions');

// List of hotel names
const hotels = [
  "Henann Resort Alona Beach",
  "Bohol Beach Club",
  "Momo Beach",
  "Amarela Resort",
  "South Palms Resort"
];

// Function to show suggestions based on user input
function showSuggestions(input) {
  // Clear any previous suggestions
  suggestionsContainer.innerHTML = '';
  
  // If input is empty, no suggestions are shown
  if (input.length === 0) {
    return;
  }
  
  // Filter the hotels that match the input
  const filteredHotels = hotels.filter(hotel => hotel.toLowerCase().includes(input.toLowerCase()));

  // Create and display the suggestion list
  filteredHotels.forEach(hotel => {
    const suggestion = document.createElement('div');
    suggestion.classList.add('suggestion-item');
    suggestion.textContent = hotel;

    // Add click event to fill the search input with the selected hotel
    suggestion.addEventListener('click', () => {
      searchInput.value = hotel;
      suggestionsContainer.innerHTML = ''; // Clear suggestions
    });

    suggestionsContainer.appendChild(suggestion);
  });
}

// Add event listener to the search input field
searchInput.addEventListener('input', () => {
  showSuggestions(searchInput.value);
});

// Hide suggestions if the user clicks outside the input or suggestions
document.addEventListener('click', (event) => {
  if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
    suggestionsContainer.innerHTML = '';
  }
});