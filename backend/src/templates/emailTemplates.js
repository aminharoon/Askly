// Modern Email Templates

export const emailTemplates = {
  welcomeEmail: (username, EMAIL_TOKEN) => {
    const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${EMAIL_TOKEN}`;

    return `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0d0d0d;
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      padding: 40px 16px;
    }

    .wrapper {
      max-width: 580px;
      margin: 0 auto;
    }

    /* ── Header ── */
    .header {
      background: #111;
      border: 1px solid #222;
      border-bottom: none;
      border-radius: 16px 16px 0 0;
      padding: 28px 40px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-dot {
      width: 10px; height: 10px;
      background: #c8f542;
      border-radius: 50%;
      box-shadow: 0 0 10px #c8f54280;
    }

    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      color: #fff;
      letter-spacing: 0.5px;
    }

    /* ── Card ── */
    .card {
      background: #111;
      border: 1px solid #222;
      border-radius: 0 0 16px 16px;
      padding: 56px 40px 52px;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: -60px; left: 50%;
      transform: translateX(-50%);
      width: 340px; height: 200px;
      background: radial-gradient(ellipse, #c8f54214 0%, transparent 70%);
      pointer-events: none;
    }

    /* ── Badge ── */
    .badge-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 32px;
    }

    .badge {
      width: 80px; height: 80px;
      background: #c8f54210;
      border: 1.5px solid #c8f54240;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .badge::after {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px dashed #c8f54230;
    }

    .badge svg {
      width: 34px; height: 34px;
    }

    /* ── Text ── */
    .eyebrow {
      text-align: center;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #c8f542;
      margin-bottom: 14px;
    }

    .headline {
      font-family: 'Playfair Display', serif;
      font-size: 34px;
      color: #f5f5f5;
      text-align: center;
      line-height: 1.2;
      margin-bottom: 20px;
    }

    .headline span { color: #c8f542; }

    .divider {
      width: 40px;
      height: 2px;
      background: linear-gradient(to right, transparent, #c8f542, transparent);
      margin: 0 auto 28px;
    }

    .body-text {
      font-size: 15px;
      line-height: 1.75;
      color: #888;
      text-align: center;
      max-width: 420px;
      margin: 0 auto 36px;
    }

    .body-text strong {
      color: #ccc;
      font-weight: 500;
    }

    /* ── CTA ── */
    .cta-wrap {
      text-align: center;
      margin-bottom: 36px;
    }

    .cta-btn {
      display: inline-block;
      background: #c8f542;
      color: #0d0d0d;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-decoration: none;
      padding: 14px 40px;
      border-radius: 100px;
    }

    .cta-sub {
      margin-top: 14px;
      font-size: 12px;
      color: #444;
    }

    /* ── Fallback link box ── */
    .link-box {
      background: #0f0f0f;
      border: 1px solid #1e1e1e;
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 32px;
    }

    .link-box-label {
      font-size: 11px;
      color: #444;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .link-box-url {
      font-size: 12px;
      color: #555;
      word-break: break-all;
      line-height: 1.6;
    }

    /* ── Expiry notice ── */
    .expiry {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 12.5px;
      color: #444;
    }

    .expiry svg {
      width: 14px; height: 14px;
      flex-shrink: 0;
    }

    .expiry span { color: #666; }

    /* ── Responsive ── */
    @media only screen and (max-width: 620px) {
      body {
        padding: 20px 10px !important;
      }

      .wrapper {
        max-width: 100% !important;
      }

      .header {
        padding: 20px 18px !important;
        border-radius: 14px 14px 0 0 !important;
      }

      .logo-text {
        font-size: 18px !important;
      }

      .card {
        padding: 36px 18px 32px !important;
        border-radius: 0 0 14px 14px !important;
      }

      .card::before {
        width: 240px !important;
        height: 140px !important;
      }

      .badge-wrap {
        margin-bottom: 24px !important;
      }

      .badge {
        width: 66px !important;
        height: 66px !important;
      }

      .badge svg {
        width: 28px !important;
        height: 28px !important;
      }

      .eyebrow {
        font-size: 10px !important;
        letter-spacing: 2px !important;
      }

      .headline {
        font-size: 28px !important;
        margin-bottom: 16px !important;
      }

      .divider {
        margin: 0 auto 22px !important;
      }

      .body-text {
        font-size: 14px !important;
        line-height: 1.65 !important;
        margin: 0 auto 28px !important;
      }

      .cta-wrap {
        margin-bottom: 28px !important;
      }

      .cta-btn {
        display: block !important;
        width: 100% !important;
        max-width: 320px !important;
        margin: 0 auto !important;
        text-align: center !important;
        padding: 13px 20px !important;
      }

      .link-box {
        padding: 14px 14px !important;
        margin-bottom: 24px !important;
      }

      .link-box-url {
        font-size: 11px !important;
        line-height: 1.55 !important;
      }

      .expiry {
        font-size: 12px !important;
        text-align: center !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="logo-dot"></div>
      <span class="logo-text">Perplexity</span>
    </div>

    <!-- Card -->
    <div class="card">

      <!-- Badge -->
      <div class="badge-wrap">
        <div class="badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="#c8f542" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
      </div>

      <p class="eyebrow">Confirm your email</p>

      <h1 class="headline">One step<br/>to go, <span>${username}.</span></h1>

      <div class="divider"></div>

      <p class="body-text">
        Thanks for signing up. Tap the button below to <strong>verify your email address</strong> and activate your Moodify account.
      </p>

     

     

      <!-- Expiry -->
      <div class="expiry">
        <svg viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        This link expires in <span>&nbsp;24 hours.</span>
      </div>

    </div>

  </div>
</body>
</html>
  `;
  }
}
