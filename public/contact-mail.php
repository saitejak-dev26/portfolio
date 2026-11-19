<?php
/**
 * Email templates for the contact form (included by contact.php).
 *
 *   mail_owner_notification() → the "new form response" email sent to you
 *   mail_thank_you()          → the confirmation email sent to the visitor
 *
 * Each returns ['subject' => …, 'html' => …, 'text' => …]. Styles are inline and
 * the layout is table-based so it renders in Gmail, Outlook and Apple Mail.
 */

// This file only defines functions; never serve it on its own.
if (!defined('CONTACT_MAILER')) {
    http_response_code(404);
    exit;
}

// ── Brand ───────────────────────────────────────────────────
const BRAND = [
    'name'     => 'Saiteja Kondakindi',
    'role'     => 'Full Stack Developer',
    'location' => 'Hyderabad, India',
    'url'      => 'https://saitejak.dev',
    'resume'   => 'https://saitejak.dev/resume/Saiteja_Kondakindi_Resume.pdf',
    'github'   => 'https://github.com/saitejak-dev26',
    'linkedin' => 'https://www.linkedin.com/in/saiteja-kondakindi-4475953ab/',
    'a1'       => '#7c5ce0',
    'a2'       => '#c2589c',
    'ink'      => '#0a0a0a',
    'ink2'     => '#404040',
    'muted'    => '#6b6b6b',
    'line'     => '#ebebeb',
    'soft'     => '#fafafa',
    'dark'     => '#0f0f14',
    'page'     => '#f4f3f8',
];

const FONT_BODY    = "'Outfit', 'Segoe UI', Helvetica, Arial, sans-serif";
const FONT_DISPLAY = "'Orbitron', 'Segoe UI', Helvetica, Arial, sans-serif";

function e(string $v): string {
    return htmlspecialchars($v, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

function first_name(string $name): string {
    $first = preg_split('/\s+/', trim($name))[0] ?? '';
    return mb_substr($first, 0, 40);
}

// ── Building blocks ─────────────────────────────────────────
function mail_button(string $href, string $label, bool $primary = true): string {
    $b = BRAND;
    $bg     = $primary ? $b['a1'] : '#ffffff';
    $color  = $primary ? '#ffffff' : $b['ink'];
    $border = $primary ? $b['a1'] : '#d4d4d8';
    $grad   = $primary ? "background-image:linear-gradient(110deg,{$b['a1']},{$b['a2']});" : '';
    return '<a href="' . e($href) . '" target="_blank" style="display:inline-block;padding:13px 22px;border-radius:12px;'
        . "background-color:{$bg};{$grad}border:1px solid {$border};color:{$color};font-family:" . FONT_BODY . ';'
        . 'font-size:15px;font-weight:600;line-height:1;text-decoration:none;mso-padding-alt:0;">' . e($label) . '</a>';
}

function mail_pill(string $label, string $dot): string {
    return '<span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#f4f4f5;border:1px solid #e5e5e5;'
        . 'font-family:' . FONT_BODY . ';font-size:13px;font-weight:600;color:' . BRAND['ink'] . ';">'
        . '<span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:' . $dot . ';margin-right:7px;vertical-align:1px;"></span>'
        . e($label) . '</span>';
}

/** Shared frame: tinted page, white card, dark header with gradient strip, footer. */
function mail_layout(string $preheader, string $kicker, string $title, string $content, string $footerNote): string {
    $b = BRAND;
    $fb = FONT_BODY;
    $fd = FONT_DISPLAY;
    $year = date('Y');
    $pre = e($preheader);
    $kicker = e($kicker);
    $title = e($title);
    $footerNote = e($footerNote);

    return <<<HTML
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>{$title}</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
<style>
  @media (max-width: 620px) {
    .wrap { padding: 12px !important; }
    .pad { padding-left: 22px !important; padding-right: 22px !important; }
    .h1 { font-size: 24px !important; }
    .btn-cell { display: block !important; padding: 0 0 10px 0 !important; }
  }
  a { color: {$b['a1']}; }
</style>
</head>
<body style="margin:0;padding:0;background:{$b['page']};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{$pre}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{$b['page']};">
  <tr>
    <td class="wrap" align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid {$b['line']};border-radius:20px;overflow:hidden;">
        <tr><td height="4" style="height:4px;line-height:4px;font-size:0;background-color:{$b['a1']};background-image:linear-gradient(110deg,{$b['a1']},{$b['a2']});">&nbsp;</td></tr>
        <tr>
          <td class="pad" style="background:{$b['dark']};padding:28px 36px 30px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="44" height="44" align="center" valign="middle" style="width:44px;height:44px;border-radius:999px;background:#ffffff;font-family:{$fb};font-size:15px;font-weight:800;letter-spacing:-1px;color:{$b['ink']};">SK</td>
                <td style="padding-left:14px;font-family:{$fd};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#d4d4d8;">{$b['name']}</td>
              </tr>
            </table>
            <div style="height:26px;line-height:26px;font-size:0;">&nbsp;</div>
            <div style="font-family:{$fb};font-size:14px;font-weight:400;letter-spacing:0.4px;color:#a1a1aa;">{$kicker}</div>
            <div class="h1" style="margin-top:6px;font-family:{$fd};font-size:28px;font-weight:800;line-height:1.2;text-transform:uppercase;color:#ffffff;">{$title}</div>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:32px 36px 8px;font-family:{$fb};font-size:16px;line-height:1.7;color:{$b['ink2']};">
            {$content}
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:8px 36px 30px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #f0f0f0;">
              <tr>
                <td style="padding-top:20px;font-family:{$fb};font-size:13px;line-height:1.6;color:{$b['muted']};">
                  {$footerNote}<br>
                  <a href="{$b['url']}" style="color:{$b['ink']};font-weight:600;text-decoration:none;">saitejak.dev</a>
                  &nbsp;·&nbsp; <a href="{$b['github']}" style="color:{$b['muted']};text-decoration:none;">GitHub</a>
                  &nbsp;·&nbsp; <a href="{$b['linkedin']}" style="color:{$b['muted']};text-decoration:none;">LinkedIn</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div style="padding-top:16px;font-family:{$fb};font-size:12px;color:#a1a1aa;">© {$year} {$b['name']} · {$b['location']}</div>
    </td>
  </tr>
</table>
</body>
</html>
HTML;
}

const TOPIC_DOTS = [
    'Full-time role'    => '#5B6BC0',
    'Freelance project' => '#C0803A',
    'Collaboration'     => '#22c55e',
    'Just saying hi'    => '#c2589c',
];

// ── 1. Form response → you ──────────────────────────────────
function mail_owner_notification(string $name, string $email, string $topic, string $message, string $ip): array {
    $b = BRAND;
    $fb = FONT_BODY;
    $first = first_name($name);
    $when = (new DateTime('now', new DateTimeZone('Asia/Kolkata')))->format('D, j M Y · g:i A') . ' IST';

    $replyHref = 'mailto:' . $email . '?subject=' . rawurlencode("Re: {$topic}");
    $row = static fn(string $k, string $v) =>
        '<tr><td width="96" style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-family:' . $fb . ';font-size:13px;color:' . $b['muted'] . ';text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">' . $k . '</td>'
        . '<td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-family:' . $fb . ';font-size:15px;font-weight:600;color:' . $b['ink'] . ';word-break:break-word;">' . $v . '</td></tr>';

    $content = mail_pill($topic, TOPIC_DOTS[$topic] ?? $b['a1'])
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0 24px;">'
        . $row('Name', e($name))
        . $row('Email', '<a href="mailto:' . e($email) . '" style="color:' . $b['a1'] . ';text-decoration:none;">' . e($email) . '</a>')
        . $row('Received', e($when))
        . '</table>'
        . '<div style="font-family:' . FONT_DISPLAY . ';font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:' . $b['ink'] . ';margin-bottom:10px;">Message</div>'
        . '<div style="padding:18px 20px;border-radius:14px;background:' . $b['soft'] . ';border:1px solid ' . $b['line'] . ';border-left:3px solid ' . $b['a1'] . ';font-size:15px;line-height:1.7;color:' . $b['ink2'] . ';">'
        . nl2br(e($message)) . '</div>'
        . '<div style="padding:26px 0 18px;">' . mail_button($replyHref, 'Reply to ' . $first) . '</div>';

    $text = "New message from your portfolio\n"
        . "================================\n\n"
        . "Topic:    {$topic}\n"
        . "Name:     {$name}\n"
        . "Email:    {$email}\n"
        . "Received: {$when}\n\n"
        . "Message\n-------\n{$message}\n\n"
        . "--\nReply directly to this email to respond to {$first}.\nIP: {$ip}\n";

    return [
        'subject' => "[Portfolio] {$topic} — {$name}",
        'html'    => mail_layout(
            "{$name} sent you a message about: {$topic}",
            'New form response',
            "Message from {$first}",
            $content,
            "Sent from the contact form on your portfolio · IP {$ip}. Hit reply to answer {$first} directly."
        ),
        'text'    => $text,
    ];
}

// ── 2. Thank-you → the visitor ──────────────────────────────
// Deliberately does NOT echo the visitor's message back: otherwise anyone could use
// this form to send arbitrary text to any address from your domain.
const TOPIC_LINES = [
    'Full-time role'    => "I'm always glad to hear about roles where I can build and ship SaaS products end to end.",
    'Freelance project' => "I'd love to learn more about your project — scope, timeline and what success looks like for you.",
    'Collaboration'     => "Collaborations are some of my favourite projects, so I'm looking forward to hearing more.",
    'Just saying hi'    => "It's always nice when someone drops by just to say hello.",
];

function mail_thank_you(string $name, string $topic): array {
    $b = BRAND;
    $fd = FONT_DISPLAY;
    $first = first_name($name);
    $hi = $first !== '' ? "Hi {$first}," : 'Hi there,';
    $topicLine = TOPIC_LINES[$topic] ?? "I'm looking forward to reading it properly and getting back to you.";

    $step = static fn(string $n, string $title, string $body) =>
        '<tr><td width="40" valign="top" style="padding:0 0 16px;">'
        . '<div style="width:28px;height:28px;line-height:28px;border-radius:999px;background:#111116;color:#ffffff;text-align:center;font-family:' . $fd . ';font-size:11px;font-weight:700;">' . $n . '</div></td>'
        . '<td valign="top" style="padding:3px 0 16px;font-size:15px;line-height:1.6;color:' . $b['ink2'] . ';"><strong style="color:' . $b['ink'] . ';font-weight:600;">' . $title . '</strong><br>' . $body . '</td></tr>';

    $content = '<p style="margin:0 0 14px;font-size:17px;color:' . $b['ink'] . ';font-weight:600;">' . e($hi) . '</p>'
        . '<p style="margin:0 0 14px;">Thanks for reaching out through my portfolio — your message about <strong style="color:' . $b['ink'] . ';font-weight:600;">' . e(mb_strtolower($topic)) . '</strong> has landed safely in my inbox.</p>'
        . '<p style="margin:0 0 26px;">' . e($topicLine) . '</p>'
        . '<div style="padding:22px 22px 6px;border-radius:16px;background:' . $b['soft'] . ';border:1px solid ' . $b['line'] . ';">'
        . '<div style="font-family:' . $fd . ';font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:' . $b['ink'] . ';margin-bottom:16px;">What happens next</div>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
        . $step('01', 'I read every message myself', 'No bots or assistants on the other end.')
        . $step('02', 'You’ll hear back within 1–2 business days', 'Usually sooner. Replies come from ' . e(TO_EMAIL) . '.')
        . $step('03', 'Want to add something?', 'Just reply to this email — it comes straight to me.')
        . '</table></div>'
        . '<p style="margin:26px 0 16px;">In the meantime, feel free to look through my recent work or grab my résumé.</p>'
        . '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
        . '<td class="btn-cell" style="padding-right:10px;">' . mail_button($b['url'] . '/#projects', 'See my projects') . '</td>'
        . '<td class="btn-cell">' . mail_button($b['resume'], 'Download résumé', false) . '</td>'
        . '</tr></table>'
        . '<p style="margin:28px 0 4px;">Talk soon,</p>'
        . '<p style="margin:0 0 20px;"><strong style="font-family:' . $fd . ';font-size:15px;font-weight:800;text-transform:uppercase;color:' . $b['ink'] . ';">' . $b['name'] . '</strong><br>'
        . '<span style="font-size:14px;color:' . $b['muted'] . ';">' . $b['role'] . ' · ' . $b['location'] . '</span></p>';

    $text = "{$hi}\n\n"
        . "Thanks for reaching out through my portfolio — your message about " . mb_strtolower($topic) . " has landed safely in my inbox.\n\n"
        . "{$topicLine}\n\n"
        . "What happens next\n-----------------\n"
        . "01  I read every message myself.\n"
        . "02  You'll hear back within 1–2 business days (usually sooner).\n"
        . "03  Want to add something? Just reply to this email.\n\n"
        . "See my projects: {$b['url']}/#projects\n"
        . "Résumé:          {$b['resume']}\n\n"
        . "Talk soon,\n{$b['name']}\n{$b['role']} · {$b['location']}\n"
        . "{$b['url']} · {$b['github']} · {$b['linkedin']}\n\n"
        . "You're receiving this one-time confirmation because this address was entered on the contact form at saitejak.dev.\n";

    return [
        'subject' => 'Thanks for getting in touch — ' . $b['name'],
        'html'    => mail_layout(
            "Got your message — I'll reply within 1–2 business days.",
            'Message received',
            'Thanks for reaching out',
            $content,
            "You're receiving this one-time confirmation because this address was entered on the contact form at saitejak.dev. If that wasn't you, you can ignore it."
        ),
        'text'    => $text,
    ];
}

// ── Sending ─────────────────────────────────────────────────
/** Sends a multipart (plain text + HTML) email via PHP mail(). */
function send_mail(string $to, array $tpl, string $replyTo, string $fromName): bool {
    $boundary = 'b_' . bin2hex(random_bytes(12));
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'From: ' . mb_encode_mimeheader($fromName, 'UTF-8') . ' <' . FROM_EMAIL . '>',
        'Reply-To: ' . $replyTo,
        'X-Mailer: PHP/' . phpversion(),
    ];

    $body = "This is a multi-part message in MIME format.\r\n\r\n"
        . "--{$boundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: quoted-printable\r\n\r\n"
        . quoted_printable_encode($tpl['text']) . "\r\n\r\n"
        . "--{$boundary}\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: quoted-printable\r\n\r\n"
        . quoted_printable_encode($tpl['html']) . "\r\n\r\n"
        . "--{$boundary}--\r\n";

    $subject = '=?UTF-8?B?' . base64_encode($tpl['subject']) . '?=';

    return @mail($to, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);
}
