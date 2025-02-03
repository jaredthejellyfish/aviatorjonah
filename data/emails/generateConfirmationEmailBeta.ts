const generateConfirmationEmailBeta = (name: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoPilot x AviatorJonah Beta Program</title>
    <style>
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #1a1a1a !important;
            }
            .email-container {
                background-color: #2d2d2d !important;
            }
            .content-text {
                color: #e0e0e0 !important;
            }
            .header-text {
                color: #ffffff !important;
            }
            .divider {
                background-color: #404040 !important;
            }
            .footer {
                background-color: #1b264f !important;
            }
            .footer-text {
                color: #cccccc !important;
            }
            .signature-name {
                color: #ffffff !important;
            }
            .signature-title {
                color: #cccccc !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f0f4f8;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 60px 0 60px 0;">
                <table role="presentation" class="email-container" style="width: 600px; border-collapse: separate; border-spacing: 0; text-align: left; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="height: 16px; background-color: #1b264f; padding: 0 0.25in;"></td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 0; text-align: center;">
                            <img src="https://mail-assets.avjco.org/blue%20transparent.png" alt="AviatorJonah Logo" style="max-width: 220px; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px;">
                            <hr class="divider" style="border: none; height: 1px; background-color: #e0e0e0; margin: 0;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h1 class="header-text" style="color: #1b264f; margin-bottom: 24px; font-size: 28px; text-align: center;">We've Received Your Application!</h1>
                            <p class="content-text" style="margin-bottom: 20px; color: #333333; font-size: 16px;">Hello ${name},</p>
                            <p class="content-text" style="margin-bottom: 20px; color: #333333; font-size: 16px;">Thank you for signing up to be a beta tester for CoPilot x AviatorJonah! Soon, you will be able to join us in shaping the future of aviation.</p>
                            <p class="content-text" style="margin-bottom: 20px; color: #333333; font-size: 16px;"><b>Some Important Details:</p></b>
                            <ul class="content-text" style="margin-bottom: 24px; padding-left: 20px; color: #333333; font-size: 16px;">
                                <li style="margin-bottom: 10px;">Applications are open until February 7th, 2025</li>
                                <li style="margin-bottom: 10px;">Our team will begin reviewing applications after the deadline</li>
                                <li style="margin-bottom: 10px;">Selected beta testers will receive exclusive early access</li>
                                <li style="margin-bottom: 10px;">Direct feedback channel to our development team</li>
                            </ul>
                            <p class="content-text" style="margin-bottom: 32px; color: #333333; font-size: 16px;">For now, you can read our weekly updates from our <a href="https://aviatorjonah.com/updates" style="color: #666666; text-decoration: none;">R&D Team</a> to stay up-to-date!</p>
                            <p class="content-text" style="margin-bottom: 32px; color: #333333; font-size: 16px;">Get ready to experience aviation technology like never before. Your insights will be invaluable in perfecting CoPilot for the entire aviation community.</p>
                            <p class="content-text" style="margin-bottom: 20px; color: #333333; font-size: 16px;">With regards,</p>
                            <div style="margin-top: 20px; display: flex; align-items: center; gap: 24px;">
                                <img src="https://mail-assets.avjco.org/jonah.png" alt="Jonah N H" style="width: 100px; height: 100px; border-radius: 50px; object-fit: cover; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                                <div>
                                    <img src="https://mail-assets.avjco.org/jonah-email-signature.png" alt="Signature" style="max-width: 180px; height: auto; margin-bottom: 8px;">
                                    <p class="signature-name" style="margin: 0; color: #1b264f; font-size: 16px; font-weight: bold;">Jonah N H</p>
                                    <p class="signature-title" style="margin: 0; color: #666666; font-size: 14px;">Founder & CFI</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer" style="background-color: #1b264f; color: #ffffff; padding: 30px 40px; text-align: center; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                            <p style="margin-bottom: 16px; font-size: 18px; color: #ffffff;">Stay connected with us:</p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center">
                                        <a href="https://www.facebook.com/AviatorJonahHQ" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                            <img src="https://mail-assets.avjco.org/facebook.png" alt="Facebook" width="24" height="24" style="display: block;">
                                        </a>
                                        <a href="https://x.com/AviatorJonahHQ" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                            <img src="https://mail-assets.avjco.org/x.png" alt="Twitter" width="24" height="24" style="display: block;">
                                        </a>
                                        <a href="https://www.instagram.com/AviatorJonahHQ" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                            <img src="https://mail-assets.avjco.org/instagram.png" alt="Instagram" width="24" height="24" style="display: block;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <p class="footer-text" style="margin-top: 24px; font-size: 14px; color: #cccccc;">© 2025 AviatorJonah, LLC. - All rights reserved.</p>
                            <p class="footer-text" style="margin-top: 16px; font-size: 12px; color: #cccccc;">
                                Still have questions? Contact us at
                                <a href="mailto:support@avjco.org" style="color: #ffffff;">support@avjco.org</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export default generateConfirmationEmailBeta;
