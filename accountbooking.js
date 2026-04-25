// ===============================
// 1. GET CURRENT USER
// ===============================
function getCurrentUserEmail() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user?.email || localStorage.getItem("userEmail");
}


// ===============================
// 2. DISPLAY BOOKINGS (TABLE + CARDS)
// ===============================
function displayUserBookings() {
  const container = document.getElementById('bookings-container');
  if (!container) return;

  const userEmail = getCurrentUserEmail();

  if (!userEmail) {
    container.innerHTML = '<p>Please log in to view your bookings</p>';
    return;
  }

  const userBookings = JSON.parse(localStorage.getItem('userBookings') || '{}');
  const bookings = userBookings[userEmail] || [];

  if (bookings.length === 0) {
    container.innerHTML = '<p>You have no bookings yet</p>';
    return;
  }

  const isTable = container.tagName.toLowerCase() === 'tbody';

  let html = '';

  // ===============================
  // TABLE LAYOUT (NEW DESIGN)
  // ===============================
  if (isTable) {
    bookings.forEach((booking, index) => {
      html += `
        <tr>
          <td>#${index + 1}</td>
          <td><span class="status confirmed">Confirmed</span></td>
          <td>${booking.stayCheckIn} - ${booking.stayCheckOut}</td>
          <td>${booking.guests}</td>
          <td class="customer-info">
            <strong>${booking.fullName || "N/A"}</strong><br>
            ${booking.email || userEmail}<br>
            ${booking.phone || "N/A"}
          </td>
          <td>₱${Number(booking.totalPrice || 0).toLocaleString()}</td>
          <td>${booking.roomType || "N/A"}</td>
          <td>${booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}</td>
        </tr>
      `;
    });
  }

  // ===============================
  // CARD LAYOUT (OLD DESIGN - SAFE)
  // ===============================
  else {
    html = '<div class="bookings-list">';

    bookings.forEach((booking, index) => {
      html += `
        <div class="booking-card">
          <div class="booking-header">
            <h3>Booking #${index + 1}</h3>
            <span class="booking-id">
              Ref: ${booking.referenceNo || booking.bookingId || "N/A"}
            </span>
          </div>

          <div class="booking-details">
            <div class="booking-image">
              <img src="${booking.roomImage || 'hotel-images/default-room.png'}" alt="Room Image">
            </div>

            <div class="booking-info">
              <p><strong>Room Type:</strong> ${booking.roomType || "N/A"}</p>
              <p><strong>Check-in:</strong> ${booking.stayCheckIn || "N/A"}</p>
              <p><strong>Check-out:</strong> ${booking.stayCheckOut || "N/A"}</p>
              <p><strong>Nights:</strong> ${booking.stayNights || "N/A"}</p>
              <p><strong>Guests:</strong> ${booking.guests || "N/A"}</p>
              <p><strong>Total Price:</strong> ₱${Number(booking.totalPrice || 0).toLocaleString()}</p>
              <p>
                <strong>Booking Date:</strong>
                ${booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div class="booking-status">
            <span class="status confirmed">Confirmed</span>
          </div>
        </div>
      `;
    });

    html += '</div>';
  }

  container.innerHTML = html;
}


// ===============================
// 3. RUN ON PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  displayUserBookings();
});