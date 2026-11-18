<?php
/**
 * Contact form endpoint for Hostinger (PHP shared hosting).
 * Receives JSON from the portfolio's contact form and emails it to you.
 *
 * SETUP (one time, in Hostinger hPanel):
 *   1. Emails → create a mailbox on your domain, e.g. no-reply@yourdomain.com
 *   2. Set FROM_EMAIL below to that mailbox (Hostinger only sends mail "from" your own domain).
 */

// ── Configuration ───────────────────────────────────────────
const TO_EMAIL   = 'careers.saitejak@gmail.com';
const FROM_EMAIL = 'no-reply@saitejak.dev';   // ← change to a mailbox on your Hostinger domain
const FROM_NAME  = 'Portfolio Contact Form';
const MIN_SECONDS_BETWEEN_SENDS = 30;           // simple per-visitor rate limit

// ── Response helpers ────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $code, array $payload): void {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Only accept requests from this same site.
$host   = $_SERVER['HTTP_HOST'] ?? '';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== $host) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

// ── Read input (JSON or regular form post) ──────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) { $data = $_POST; }

$name    = trim((string)($data['name'] ?? ''));
$email   = trim((string)($data['email'] ?? ''));
$topic   = trim((string)($data['topic'] ?? 'General'));
$message = trim((string)($data['message'] ?? ''));
$honey   = trim((string)($data['company'] ?? ''));

// Honeypot: real visitors never fill this hidden field.
if ($honey !== '') {
    respond(200, ['ok' => true]);
}

// ── Validation ──────────────────────────────────────────────
if ($name === '' || mb_strlen($name) > 100) {
    respond(422, ['ok' => false, 'error' => 'Please add your name.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 200) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    respond(422, ['ok' => false, 'error' => 'Please write a message between 10 and 5000 characters.']);
}
$allowedTopics = ['Full-time role', 'Freelance project', 'Collaboration', 'Just saying hi'];
if (!in_array($topic, $allowedTopics, true)) { $topic = 'General'; }

// Strip anything that could inject extra mail headers.
$clean = static fn(string $v): string => str_replace(["\r", "\n", '%0a', '%0d'], ' ', $v);
$name  = $clean($name);
$email = $clean($email);

// ── Simple rate limit per IP ────────────────────────────────
$ip      = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lockDir = sys_get_temp_dir() . '/portfolio_contact';
if (!is_dir($lockDir)) { @mkdir($lockDir, 0700, true); }
$lock = $lockDir . '/' . hash('sha256', $ip);
if (is_file($lock) && (time() - (int)@filemtime($lock)) < MIN_SECONDS_BETWEEN_SENDS) {
    respond(429, ['ok' => false, 'error' => 'Please wait a few seconds before sending another message.']);
}

// ── Send ────────────────────────────────────────────────────
$subject = '=?UTF-8?B?' . base64_encode("[Portfolio] {$topic} — {$name}") . '?=';
$body = "New message from your portfolio\n"
      . "--------------------------------\n"
      . "Name:  {$name}\n"
      . "Email: {$email}\n"
      . "Topic: {$topic}\n\n"
      . $message . "\n\n"
      . "--------------------------------\n"
      . 'Sent: ' . gmdate('Y-m-d H:i') . " UTC · IP: {$ip}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'Sorry, the message could not be sent. Please email ' . TO_EMAIL . ' directly.']);
}

@touch($lock);
respond(200, ['ok' => true]);
