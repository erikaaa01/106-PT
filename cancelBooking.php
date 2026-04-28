<?php
session_start();
header("Content-Type: application/json");

// ── DB config — match your existing connection settings ───────────────────
$host   = "localhost";
$dbname = "tropistay";   // ← your database name
$user   = "root";
$pass   = "";
// ─────────────────────────────────────────────────────────────────────────

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

$body      = json_decode(file_get_contents("php://input"), true);
$reference = isset($body["booking_reference"]) ? trim($body["booking_reference"]) : "";

if (!$reference) {
    echo json_encode(["success" => false, "message" => "Missing booking reference."]);
    exit;
}

// Must be logged in
if (empty($_SESSION["user_id"]) && empty($_SESSION["user_email"])) {
    echo json_encode(["success" => false, "message" => "Not authenticated."]);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $user, $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Update status to 'cancelled' — matches booking_reference AND user_email
    // so users can only cancel their own bookings
    $userEmail = $_SESSION["user_email"] ?? "";

    $stmt = $pdo->prepare("
        UPDATE bookings
        SET status = 'cancelled'
        WHERE booking_reference = :reference
          AND user_email = :user_email
    ");
    $stmt->execute([
        ":reference"  => $reference,
        ":user_email" => $userEmail
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Booking cancelled."]);
    } else {
        echo json_encode(["success" => false, "message" => "Booking not found or access denied."]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>