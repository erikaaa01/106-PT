<?php
require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? ($_GET['action'] ?? '');

$conn = getDBConnection();

// ============================================
// SAVE BOOKING
// ============================================
if ($action === 'save') {
    $required = ['booking_id','booking_reference','user_email','first_name','last_name',
                 'email','room_type','room_quantity','unit_price','total_price',
                 'check_in','check_out','nights'];

    foreach ($required as $field) {
        if (empty($input[$field])) {
            echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
            exit();
        }
    }

    $stmt = $conn->prepare("
        INSERT INTO bookings 
            (booking_id, booking_reference, user_email, first_name, last_name, email,
             country, phone, special_requests, booking_for, travelling_for_work,
             hotel_name, room_type, room_quantity, unit_price, total_price,
             check_in, check_out, nights, payment_method, card_last4, status)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ");

    $booking_id          = $input['booking_id'];
    $booking_reference   = $input['booking_reference'];
    $user_email          = $input['user_email'];
    $first_name          = $input['first_name'];
    $last_name           = $input['last_name'];
    $email               = $input['email'];
    $country             = $input['country']             ?? '';
    $phone               = $input['phone']               ?? '';
    $special_requests    = $input['special_requests']    ?? '';
    $booking_for         = $input['booking_for']         ?? '';
    $travelling_for_work = $input['travelling_for_work'] ?? '';
    $hotel_name          = $input['hotel_name']          ?? '';
    $room_type           = $input['room_type'];
    $room_quantity       = (int)$input['room_quantity'];
    $unit_price          = (float)$input['unit_price'];
    $total_price         = (float)$input['total_price'];
    $check_in            = $input['check_in'];
    $check_out           = $input['check_out'];
    $nights              = (int)$input['nights'];
    $payment_method      = $input['payment_method']      ?? '';
    $card_last4          = $input['card_last4']          ?? '';
    $status              = 'confirmed';

    $stmt->bind_param(
        "sssssssssssssiddssisss",
        $booking_id, $booking_reference, $user_email, $first_name, $last_name, $email,
        $country, $phone, $special_requests, $booking_for, $travelling_for_work,
        $hotel_name, $room_type, $room_quantity, $unit_price, $total_price,
        $check_in, $check_out, $nights, $payment_method, $card_last4, $status
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Booking saved successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save booking: ' . $stmt->error]);
    }
    $stmt->close();
}

// ============================================
// GET BOOKINGS FOR A USER
// ============================================
elseif ($action === 'get') {
    $user_email = $input['user_email'] ?? $_GET['user_email'] ?? '';

    if (!$user_email) {
        echo json_encode(['success' => false, 'message' => 'user_email is required.']);
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM bookings WHERE user_email = ? ORDER BY created_at DESC");
    $stmt->bind_param("s", $user_email);
    $stmt->execute();
    $result = $stmt->get_result();

    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    echo json_encode(['success' => true, 'bookings' => $bookings]);
    $stmt->close();
}

// ============================================
// UNKNOWN ACTION
// ============================================
else {
    echo json_encode(['success' => false, 'message' => 'Unknown action.']);
}

$conn->close();
?>