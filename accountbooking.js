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
  // TABLE LAYOUT
  // ===============================
  if (isTable) {
    bookings.forEach((booking, index) => {
      html += `
        <tr data-booking-reference="${booking.referenceNo || booking.bookingId || ''}">
          <td><span class="status ${booking.status || 'confirmed'}">${booking.status || 'Confirmed'}</span></td>

          <td>${booking.stayCheckIn || ''} - ${booking.stayCheckOut || ''}</td>

          <td>${booking.guests || ''}</td>

          <td class="customer-info">
            ${booking.fullName ? `<strong>${booking.fullName}</strong><br>` : ""}
            ${booking.email || userEmail ? `${booking.email || userEmail}<br>` : ""}
            ${booking.phone ? booking.phone : ""}
          </td>

          <td>₱${Number(booking.totalPrice || 0).toLocaleString()}</td>

          <td>${booking.roomType || ""}</td>

          <td>${booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : ""}</td>

          <td>
            ${booking.status !== "cancelled"
              ? `<button class="cancel-btn"
                   data-index="${index}"
                   data-reference="${booking.referenceNo || booking.bookingId || ''}">
                   Cancel
                 </button>`
              : ""
            }
          </td>
        </tr>
      `;
    });
  }

  // ===============================
  // CARD LAYOUT
  // ===============================
  else {
    html = '<div class="bookings-list">';

    bookings.forEach((booking, index) => {
      html += `
        <div class="booking-card" data-booking-reference="${booking.referenceNo || booking.bookingId || ''}">
          <div class="booking-header">
            <h3>Booking #${index + 1}</h3>
            <span class="booking-id">
              Ref: ${booking.referenceNo || booking.bookingId || ""}
            </span>
          </div>

          <div class="booking-details">
            <div class="booking-image">
              <img src="${booking.roomImage || 'hotel-images/default-room.png'}" alt="Room Image">
            </div>

            <div class="booking-info">
              <p><strong>Room Type:</strong> ${booking.roomType || ""}</p>
              <p><strong>Check-in:</strong> ${booking.stayCheckIn || ""}</p>
              <p><strong>Check-out:</strong> ${booking.stayCheckOut || ""}</p>
              <p><strong>Nights:</strong> ${booking.stayNights || ""}</p>
              <p><strong>Guests:</strong> ${booking.guests || ""}</p>
              <p><strong>Total Price:</strong> ₱${Number(booking.totalPrice || 0).toLocaleString()}</p>
              <p>
                <strong>Booking Date:</strong>
                ${booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : ""}
              </p>
            </div>
          </div>

          <div class="booking-status">
            <span class="status ${booking.status || 'confirmed'}">${booking.status || 'Confirmed'}</span>
            ${booking.status !== "cancelled"
              ? `<button class="cancel-btn"
                   data-index="${index}"
                   data-reference="${booking.referenceNo || booking.bookingId || ''}">
                   Cancel
                 </button>`
              : ""
            }
          </div>
        </div>
      `;
    });

    html += '</div>';
  }

  container.innerHTML = html;
}


// ===============================
// 3. CANCEL BOOKING
// ===============================
let selectedIndex = null;
let selectedReference = null;

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("cancel-btn")) {
    selectedIndex     = e.target.getAttribute("data-index");
    selectedReference = e.target.getAttribute("data-reference");
    document.getElementById("cancel-modal").style.display = "flex";
  }
});

document.getElementById("close-modal")?.addEventListener("click", () => {
  document.getElementById("cancel-modal").style.display = "none";
});

document.getElementById("confirm-cancel")?.addEventListener("click", () => {
  const userEmail    = getCurrentUserEmail();
  const userBookings = JSON.parse(localStorage.getItem('userBookings') || '{}');

  // ── Step 1: update localStorage ─────────────────────────────────────────
  if (userBookings[userEmail] && userBookings[userEmail][selectedIndex]) {
    userBookings[userEmail][selectedIndex].status = "cancelled";
    localStorage.setItem('userBookings', JSON.stringify(userBookings));
  }

  // ── Step 2: update the database via PHP ─────────────────────────────────
  if (selectedReference) {
    fetch("api/cancel_booking.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_reference: selectedReference })
    })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        console.warn("DB cancel failed:", data.message);
      }
    })
    .catch(err => {
      console.error("Network error during DB cancel:", err);
    });
  }

  // ── Step 3: close modal and refresh list ────────────────────────────────
  document.getElementById("cancel-modal").style.display = "none";
  selectedIndex     = null;
  selectedReference = null;

  displayUserBookings();
});


// ===============================
// 4. RUN ON PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  displayUserBookings();
});