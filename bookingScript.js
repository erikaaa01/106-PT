// ─────────────────────────────────────────────────────────────
// FIX 1: Unified email lookup — checks every key your SignLog
//         system might use so nothing falls through the cracks.
// ─────────────────────────────────────────────────────────────
function getCurrentUserEmail() {
  return localStorage.getItem('userEmail') ||          // set by SignLog.html
         localStorage.getItem('currentUserEmail') ||   // legacy key
         JSON.parse(localStorage.getItem('userInfo')  || '{}').email ||
         JSON.parse(localStorage.getItem('guestInfo') || '{}').email ||
         null;
}

// ─────────────────────────────────────────────────────────────
// FIX 2: Auth guard — call this before entering the booking
//         flow. Saves the destination URL so the user is
//         returned to the right page after logging in.
// ─────────────────────────────────────────────────────────────
function requireLogin(redirectTo) {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const email    = getCurrentUserEmail();
  if (!loggedIn || !email) {
    localStorage.setItem('redirectAfterLogin', redirectTo || window.location.href);
    window.location.href = 'SignLog.html';
    return false;
  }
  return true;
}

// ─────────────────────────────────────────────────────────────
// FIX 3: saveBookingToHistory now ALWAYS runs — independently
//         of whether the PHP API succeeds or fails. This way
//         the account page always shows the booking even if
//         the server is unreachable.
// ─────────────────────────────────────────────────────────────
function saveBookingToHistory(bookingData) {
  try {
    // Use the same unified lookup so the key always matches
    // what the account page reads
    const userEmail = getCurrentUserEmail();
    if (!userEmail) {
      console.warn("saveBookingToHistory: no user email — skipping.");
      return;
    }

    const userBookings = JSON.parse(localStorage.getItem('userBookings') || '{}');
    if (!Array.isArray(userBookings[userEmail])) {
      userBookings[userEmail] = [];
    }

    // Stamp with IDs and date if not already present
    if (!bookingData.bookingId)   bookingData.bookingId   = generateRandomId(8);
    if (!bookingData.referenceNo) bookingData.referenceNo = generateRandomId(10);
    if (!bookingData.bookingDate) bookingData.bookingDate = new Date().toISOString();

    userBookings[userEmail].unshift(bookingData); // newest first
    localStorage.setItem('userBookings', JSON.stringify(userBookings));
    console.log("Booking saved to localStorage history:", bookingData);
  } catch (e) {
    console.error("Error saving booking history:", e);
  }
}

// ─────────────────────────────────────────────────────────────
// Modal image helper (unchanged)
// ─────────────────────────────────────────────────────────────
function getRoomImageFromModal(row) {
  const seeMoreButton = row.querySelector(".see-more");
  if (!seeMoreButton) return "hotel-images/default-room.jpg";
  const modalId = seeMoreButton.getAttribute("data-modal-id");
  const modal   = document.getElementById(modalId);
  if (!modal) return "hotel-images/default-room.jpg";
  const modalImg = modal.querySelector(".main-img");
  return modalImg?.src || "hotel-images/default-room.jpg";
}

// ─────────────────────────────────────────────────────────────
// reserveRoom — now checks login BEFORE redirecting to step 1
// ─────────────────────────────────────────────────────────────
function reserveRoom(roomType, selectId) {
  console.log("reserveRoom called for:", roomType, selectId);

  // ── FIX: block unauthenticated users right here ──
  if (!requireLogin('booking-step1.html')) return;

  const qty = parseInt(document.getElementById(selectId).value, 10);
  if (qty <= 0) {
    alert("Please select at least one room to reserve.");
    return;
  }

  const selectEl = document.getElementById(selectId);
  const row      = selectEl.closest("tr");

  const priceText = row.querySelector(".price").innerText.replace(/[^0-9]/g, "");
  const unitPrice = parseInt(priceText, 10);
  const totalPrice = unitPrice * qty;
  const checkIn  = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;

  if (!checkIn || !checkOut) {
    alert('Please select check-in and check-out dates before reserving a room.');
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    } else {
      const checkInInput = document.getElementById("check-in");
      if (checkInInput) { checkInInput.scrollIntoView({ behavior: "smooth" }); checkInInput.focus(); }
    }
    return;
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  const nights   = Math.round((new Date(checkOut) - new Date(checkIn)) / msPerDay);

  const formatDate = (dateStr) => {
    const date   = new Date(dateStr);
    const days   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  let roomImage = "hotel-images/default-room.png";
  const seeMoreButton = row.querySelector(".see-more");
  if (seeMoreButton) {
    const modalId = seeMoreButton.getAttribute("data-modal-id");
    const modal   = document.getElementById(modalId);
    if (modal) {
      const modalImg = modal.querySelector(".main-img");
      if (modalImg && modalImg.src) {
        roomImage = "hotel-images/" + modalImg.src.split('/').pop();
      }
    }
  }

  const hotelImage = "hotel-images/alona1.png";

  let adults = 2, children = 0, rooms = 1;
  if (document.getElementById("adult-count")) adults   = parseInt(document.getElementById("adult-count").textContent, 10);
  if (document.getElementById("child-count")) children = parseInt(document.getElementById("child-count").textContent, 10);
  if (document.getElementById("room-count"))  rooms    = parseInt(document.getElementById("room-count").textContent, 10);
  const guestsSummary = `${adults} adult${adults !== 1 ? 's' : ''} · ${children} child${children !== 1 ? 'ren' : ''} · ${rooms} room${rooms !== 1 ? 's' : ''}`;

  const reservationData = {
    roomType,
    guests: guestsSummary,
    quantity: qty,
    unitPrice,
    totalPrice,
    stayCheckIn:  formatDate(checkIn),
    stayCheckOut: formatDate(checkOut),
    stayNights:   nights,
    rawCheckIn:   checkIn,
    rawCheckOut:  checkOut,
    roomImage,
    hotelImage,
    timestamp: new Date().toISOString()
  };

  try {
    localStorage.setItem("reservationData", JSON.stringify(reservationData));
    console.log("Reservation data saved:", reservationData);
  } catch (e) {
    console.error("Error saving to localStorage:", e);
    alert("There was an error saving your selection. Please try again.");
    return;
  }

  localStorage.removeItem("guestInfo");
  localStorage.removeItem("paymentInfo");
  window.location.href = "booking-step1.html";
}

// ─────────────────────────────────────────────────────────────
// Step 1 initialiser
// ─────────────────────────────────────────────────────────────
function initBookingStep1() {
  console.log("Initializing booking step 1");

  // ── FIX: guard step 1 directly too, in case someone
  //         navigates to booking-step1.html manually ──
  if (!requireLogin('booking-step1.html')) return;

  const proceedBtn = document.getElementById('proceed-btn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', function () {
      const firstName      = document.querySelector('input[placeholder="First Name"]').value.trim();
      const lastName       = document.querySelector('input[placeholder="Last Name"]').value.trim();
      const email          = document.querySelector('input[placeholder="Email"]').value.trim();
      const country        = document.querySelector('input[placeholder="Country / Region of Residence"]').value.trim();
      const phoneNumber    = document.querySelector('input[placeholder="Phone Number (optional)"]').value.trim();
      const bookingFor     = document.querySelector('select').value;
      const travellingForWork = document.querySelectorAll('select')[1].value;
      const specialRequests   = document.querySelector('textarea').value.trim();

      if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields (First Name, Last Name, Email)');
        return;
      }

      const guestInfo = { firstName, lastName, email, country, phoneNumber, bookingFor, travellingForWork, specialRequests };
      localStorage.setItem("guestInfo", JSON.stringify(guestInfo));
      localStorage.setItem("userInfo",  JSON.stringify({ firstName, lastName, email, country, phone: phoneNumber }));
      console.log("Guest info saved:", guestInfo);

      window.location.href = 'booking-step2.html';
    });
  }

  // Populate display fields from saved reservation
  const data = JSON.parse(localStorage.getItem("reservationData") || "{}");
  console.log("Retrieved reservation data:", data);

  if (!data.roomType) {
    console.error("No room data found");
    alert("No room selected. Redirecting back to room selection.");
    window.location.href = "index.html";
    return;
  }

  if (document.getElementById("room-name"))     document.getElementById("room-name").textContent     = data.roomType || "Room";
  if (document.getElementById("room-quantity"))  document.getElementById("room-quantity").textContent  = data.quantity || "1";
  if (document.getElementById("room-price"))     document.getElementById("room-price").textContent     = `₱ ${(data.totalPrice || 0).toLocaleString()}`;
  if (data.roomImage  && document.getElementById("room-image"))  document.getElementById("room-image").src  = data.roomImage;
  if (data.hotelImage && document.getElementById("hotel-image")) document.getElementById("hotel-image").src = data.hotelImage;
  if (document.getElementById("check-in-date"))  document.getElementById("check-in-date").textContent  = data.stayCheckIn  || "--";
  if (document.getElementById("check-out-date")) document.getElementById("check-out-date").textContent = data.stayCheckOut || "--";
  if (document.getElementById("nights-count"))   document.getElementById("nights-count").textContent   = data.stayNights   || "0";

  const timeSpan = document.getElementById("nights-count")?.nextElementSibling;
  if (timeSpan && timeSpan.classList.contains("time")) {
    timeSpan.textContent = parseInt(data.stayNights || 0) !== 1 ? "nights" : "night";
  }
}

// ─────────────────────────────────────────────────────────────
// Step 2 initialiser
// ─────────────────────────────────────────────────────────────
function initBookingStep2() {
  console.log("Initializing booking step 2");

  if (!requireLogin('booking-step2.html')) return;

  // Populate stay summary sidebar
  const data = JSON.parse(localStorage.getItem("reservationData") || "{}");
  if (document.getElementById("check-in-date"))  document.getElementById("check-in-date").textContent  = data.stayCheckIn  || "--";
  if (document.getElementById("check-out-date")) document.getElementById("check-out-date").textContent = data.stayCheckOut || "--";
  if (document.getElementById("nights-count"))   document.getElementById("nights-count").textContent   = data.stayNights   || "0";
  if (document.getElementById("room-name"))      document.getElementById("room-name").textContent      = data.roomType     || "--";
  if (document.getElementById("room-quantity"))  document.getElementById("room-quantity").textContent  = data.quantity     || "1";
  if (document.getElementById("room-price"))     document.getElementById("room-price").textContent     = `₱ ${(data.totalPrice || 0).toLocaleString()}`;
  if (data.roomImage  && document.getElementById("room-image"))  document.getElementById("room-image").src  = data.roomImage;
  if (data.hotelImage && document.getElementById("hotel-image")) document.getElementById("hotel-image").src = data.hotelImage;

  // ── GCash / Card toggle ──────────────────────────────────────
  const paymentSelect = document.getElementById('paymentMethod');
  const cardFields    = document.getElementById('card-fields');
  const gcashFields   = document.getElementById('gcash-fields');

  function togglePaymentFields() {
    const isGcash = paymentSelect && paymentSelect.value === 'gcash';
    if (cardFields)  cardFields.style.display  = isGcash ? 'none' : 'block';
    if (gcashFields) gcashFields.style.display = isGcash ? 'block' : 'none';
  }

  if (paymentSelect) {
    paymentSelect.addEventListener('change', togglePaymentFields);
    togglePaymentFields(); // run on load
  }

  // ── Helper: show/clear inline errors ────────────────────────
  function setError(inputId, errId, message) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errId);
    if (!input || !err) return;
    if (message) {
      input.classList.add('input-error');
      err.textContent = message;
    } else {
      input.classList.remove('input-error');
      err.textContent = '';
    }
  }

  // Clear errors on input
  ['cardholderName','cardNumber','expirationDate','cvv','gcashNumber','gcashName'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => el.classList.remove('input-error'));
  });

  // Auto-format card number with spaces
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function () {
      let val = this.value.replace(/\D/g, '').substring(0, 16);
      this.value = val.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // Auto-format expiry MM/YY
  const expiryInput = document.getElementById('expirationDate');
  if (expiryInput) {
    expiryInput.addEventListener('input', function () {
      let val = this.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) val = val.substring(0,2) + '/' + val.substring(2);
      this.value = val;
    });
  }

  // ── Confirm button ───────────────────────────────────────────
  const confirmBtn = document.getElementById('confirm-btn');
  if (!confirmBtn) return;

  confirmBtn.addEventListener('click', function () {
    const method  = paymentSelect ? paymentSelect.value : '';
    const isGcash = method === 'gcash';
    let valid = true;

    if (isGcash) {
      // Validate GCash fields
      const gcashNum  = (document.getElementById('gcashNumber')?.value || '').trim();
      const gcashName = (document.getElementById('gcashName')?.value || '').trim();

      setError('gcashNumber', 'err-gcash', '');
      setError('gcashName',   'err-gcash-name', '');

      if (!gcashNum) {
        setError('gcashNumber', 'err-gcash', 'GCash number is required.'); valid = false;
      } else if (!/^09\d{9}$/.test(gcashNum)) {
        setError('gcashNumber', 'err-gcash', 'Enter a valid GCash number (e.g. 09XXXXXXXXX).'); valid = false;
      }
      if (!gcashName) {
        setError('gcashName', 'err-gcash-name', 'Account name is required.'); valid = false;
      }

      if (!valid) return;

      const paymentInfo = {
        paymentMethod: 'GCash',
        cardholderName: gcashName,
        cardNumberLast4: gcashNum.slice(-4),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

    } else {
      // Validate card fields
      const cardholderName = (document.getElementById('cardholderName')?.value || '').trim();
      const cardNumber     = (document.getElementById('cardNumber')?.value || '').trim();
      const expirationDate = (document.getElementById('expirationDate')?.value || '').trim();
      const cvv            = (document.getElementById('cvv')?.value || '').trim();

      setError('cardholderName', 'err-name',   '');
      setError('cardNumber',     'err-number', '');
      setError('expirationDate', 'err-expiry', '');
      setError('cvv',            'err-cvv',    '');

      if (!cardholderName) {
        setError('cardholderName', 'err-name', 'Cardholder name is required.'); valid = false;
      }
      if (!cardNumber) {
        setError('cardNumber', 'err-number', 'Card number is required.'); valid = false;
      } else if (cardNumber.replace(/\s/g, '').length < 13) {
        setError('cardNumber', 'err-number', 'Enter a valid card number (13–16 digits).'); valid = false;
      }
      if (!expirationDate) {
        setError('expirationDate', 'err-expiry', 'Expiration date is required.'); valid = false;
      } else if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
        setError('expirationDate', 'err-expiry', 'Use MM/YY format (e.g. 08/27).'); valid = false;
      }
      if (!cvv) {
        setError('cvv', 'err-cvv', 'CVV is required.'); valid = false;
      } else if (!/^\d{3,4}$/.test(cvv)) {
        setError('cvv', 'err-cvv', 'CVV must be 3 or 4 digits.'); valid = false;
      }

      if (!valid) return;

      const paymentInfo = {
        paymentMethod: method,
        cardholderName,
        cardNumberLast4: cardNumber.replace(/\s/g,'').slice(-4),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
    }

    const bookingReference = generateRandomId(10);
    localStorage.setItem("bookingReference", bookingReference);
    window.location.href = 'booking-step3.html';
  });
}

// ─────────────────────────────────────────────────────────────
// Step 3 initialiser
// FIX 4: saveBookingToHistory is now called UNCONDITIONALLY
//         (before the fetch), so localStorage is always updated
//         even when the PHP API is unavailable.
//         The fetch still tries to save to the DB in parallel.
// ─────────────────────────────────────────────────────────────
function initBookingStep3() {
  console.log("Initializing booking step 3");

  if (!document.getElementById('booking-id')) {
    console.log("Not on confirmation page");
    return;
  }

  const bookingId   = generateRandomId(8);
  const referenceNo = localStorage.getItem("bookingReference") || generateRandomId(10);
  const memberId    = generateRandomId(6);

  document.getElementById('booking-id').textContent = bookingId;
  if (document.getElementById('confirmation-id')) document.getElementById('confirmation-id').textContent = bookingId;
  if (document.getElementById('booking-ref'))     document.getElementById('booking-ref').textContent     = referenceNo;
  if (document.getElementById('reference-no'))    document.getElementById('reference-no').textContent    = referenceNo;
  if (document.getElementById('member-id'))       document.getElementById('member-id').textContent       = memberId;

  const data = JSON.parse(localStorage.getItem("reservationData") || "{}");
  console.log("Retrieved reservation data for step 3:", data);

  if (!data.roomType) {
    alert("No booking data found. Redirecting back.");
    window.location.href = "index.html";
    return;
  }

  if (document.getElementById("room-name"))     document.getElementById("room-name").textContent     = data.roomType;
  if (document.getElementById("room-type"))     document.getElementById("room-type").textContent     = data.roomType;
  if (document.getElementById("room-quantity")) document.getElementById("room-quantity").textContent = data.quantity;
  if (document.getElementById("room-price"))    document.getElementById("room-price").textContent    = `₱ ${data.totalPrice.toLocaleString()}`;
  if (document.getElementById("check-in-date")) document.getElementById("check-in-date").textContent  = data.stayCheckIn  || "--";
  if (document.getElementById("check-out-date"))document.getElementById("check-out-date").textContent = data.stayCheckOut || "--";
  if (document.getElementById("nights-count"))  document.getElementById("nights-count").textContent   = data.stayNights   || "0";
  if (data.roomImage && document.getElementById("room-image")) {
    document.getElementById("room-image").src = data.roomImage;
    document.getElementById("room-image").alt = data.roomType;
  }

  const guestInfo  = JSON.parse(localStorage.getItem('guestInfo')  || '{}');
  const userInfo   = JSON.parse(localStorage.getItem('userInfo')   || '{}');
  const clientInfo = guestInfo.firstName ? guestInfo : userInfo;

  if (clientInfo && clientInfo.firstName) {
    if (document.getElementById('client-name'))    document.getElementById('client-name').textContent    = `${clientInfo.firstName} ${clientInfo.lastName}`;
    if (document.getElementById('client-email'))   document.getElementById('client-email').textContent   = clientInfo.email;
    if (document.getElementById('client-country')) document.getElementById('client-country').textContent = clientInfo.country;
    if (document.getElementById('client-phone'))   document.getElementById('client-phone').textContent   = clientInfo.phoneNumber || clientInfo.phone || 'Not provided';
  }
  if (document.getElementById("special-requests")) {
    document.getElementById("special-requests").textContent = guestInfo.specialRequests || "-";
  }

  // ── Build payload ──
  const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo') || '{}');

  // FIX 1 (email): use unified helper so user_email is never blank
  const userEmail = getCurrentUserEmail() || '';

  const bookingPayload = {
    action:              'save',
    booking_id:          bookingId,
    booking_reference:   referenceNo,
    user_email:          userEmail,
    first_name:          clientInfo.firstName        || '',
    last_name:           clientInfo.lastName         || '',
    email:               clientInfo.email            || userEmail,
    country:             clientInfo.country          || '',
    phone:               clientInfo.phoneNumber      || clientInfo.phone || '',
    special_requests:    guestInfo.specialRequests   || '',
    booking_for:         guestInfo.bookingFor        || '',
    travelling_for_work: guestInfo.travellingForWork || '',
    hotel_name:          data.hotelName              || 'Henann Resort Alona Beach',
    room_type:           data.roomType,
    room_quantity:       data.quantity,
    unit_price:          data.unitPrice,
    total_price:         data.totalPrice,
    check_in:            data.rawCheckIn             || data.stayCheckIn  || '',
    check_out:           data.rawCheckOut            || data.stayCheckOut || '',
    nights:              data.stayNights,
    guests:              data.guests                 || '',
    payment_method:      paymentInfo.paymentMethod   || '',
    card_last4:          paymentInfo.cardNumberLast4 || '',
    bookingDate:         new Date().toISOString(),
    // Keep these for the account page display
    stayCheckIn:         data.stayCheckIn,
    stayCheckOut:        data.stayCheckOut,
    stayNights:          data.stayNights,
    roomImage:           data.roomImage              || '',
    totalPrice:          data.totalPrice,
    roomType:            data.roomType,
  };

  // ── FIX 4: Save to localStorage FIRST — always, no matter what ──
  saveBookingToHistory({ ...bookingPayload, bookingId, referenceNo });

  // ── Then attempt to save to DB (best-effort) ──
  fetch('api/bookings.php', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(bookingPayload)
  })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(result => {
    if (result.success) {
      console.log("Booking also saved to database successfully.");
    } else {
      console.warn("DB save reported failure:", result.message);
    }
  })
  .catch(err => {
    // Non-fatal — booking is already in localStorage
    console.warn("Could not reach bookings.php:", err.message);
  });
}

// ─────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────
function generateRandomId(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result  = '';
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

// ─────────────────────────────────────────────────────────────
// Auto-detect page and initialise
// FIX 5: script is loaded in <head> without defer on step 1 & 3,
//         so we wrap everything in DOMContentLoaded.
//         Step 2 also calls initBookingStep2() explicitly at the
//         bottom of its HTML — that's fine and still works.
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM loaded — detecting page");

  if (document.querySelector('.step-indicator.step1.active')) {
    console.log("→ Step 1");
    initBookingStep1();
  } else if (document.querySelector('.step-indicator.step2.active')) {
    console.log("→ Step 2");
    initBookingStep2();
  } else if (document.querySelector('.step-indicator.step3.active')) {
    console.log("→ Step 3");
    initBookingStep3();
  } else {
    console.log("→ Other page (room selection or home)");
  }
});