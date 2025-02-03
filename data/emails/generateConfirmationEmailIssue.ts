const generateConfirmationEmailIssue = (name: string, issueSummary: string) => {
	return `
   <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Issue Report Confirmation - AviatorJonah</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f0f4f8;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 60px 0 60px 0;">
                <table role="presentation"
                    style="width: 600px; border-collapse: separate; border-spacing: 0; text-align: left; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);">
                    <!-- Blue line at the top -->
                    <tr>
                        <td style="height: 16px; background-color: #1b264f; padding: 0 0.25in;"></td>
                    </tr>
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 0; text-align: center; background-color: #ffffff;">
                            <img src="https://assets.aviatorjonah.com/blue%20transparent.png" alt="AviatorJonah Logo"
                                style="max-width: 220px; height: auto;">
                        </td>
                    </tr>
                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <hr style="border: none; height: 1px; background-color: #e0e0e0; margin: 0;">
                        </td>
                    </tr>
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h1 style="color: #1b264f; margin-bottom: 24px; font-size: 28px; text-align: center;">We've Received Your Report</h1>
                            <p style="margin-bottom: 20px; color: #333333; font-size: 16px;">Hello${name && ` ${name}`},</p>
                            <p style="margin-bottom: 20px; color: #333333; font-size: 16px;">Thank you for bringing this issue to our attention. We have received your report and our team will be reviewing it shortly.</p>
                            
                            <p style="margin-bottom: 20px; color: #333333; font-size: 16px;"><b>Issue Summary:</b></p>
                            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                                <p style="margin: 0; color: #333333; font-size: 16px;">${issueSummary}</p>
                            </div>

                            <p style="margin-bottom: 20px; color: #333333; font-size: 16px;"><b>What Happens Next:</b></p>
                            <ul style="margin-bottom: 24px; padding-left: 20px; color: #333333; font-size: 16px;">
                                <li style="margin-bottom: 10px;">Our support team will review your report within 24-48 hours</li>
                                <li style="margin-bottom: 10px;">You'll receive a follow-up email with our findings or if we need additional information</li>
                                <li style="margin-bottom: 10px;">Priority will be given based on the severity and impact of the issue</li>
                            </ul>

                            <p style="margin-bottom: 32px; color: #333333; font-size: 16px;">If you need immediate assistance or have additional information to share, please don't hesitate to contact us directly at <a href="mailto:support@avjco.org" style="color: #1b264f; text-decoration: underline;">support@avjco.org</a>.</p>

                            <p style="margin-bottom: 20px; color: #333333; font-size: 16px;">Thank you for helping us improve our services.</p>

                            <p style="margin-bottom: 20px; color: #333333; font-size: 16px;">Best regards,</p>

                            <div style="margin-top: 20px; display: flex; align-items: center; gap: 24px;">
                                <img src="https://assets.aviatorjonah.com/jonah.png" alt="Jonah N H"
                                    style="width: 100px; height: 100px; border-radius: 50px; object-fit: cover; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                                <div>
                                    <img src="https://mail-assets.avjco.org/jonah-email-signature.png" alt="Signature"
                                        style="max-width: 180px; height: auto; margin-bottom: 8px;">
                                    <p style="margin: 0; color: #1b264f; font-size: 16px; font-weight: bold;">Jonah N. H.</p>
                                    <p style="margin: 0; color: #666666; font-size: 14px;">Founder & CFI</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #1b264f; color: #ffffff; padding: 30px 40px; text-align: center; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                            <p style="margin-bottom: 16px; font-size: 18px;">Stay connected with us:</p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center">
                                        <a href="https://www.facebook.com/AviatorJonahHQ"
                                            style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                            <img src="https://mail-assets.avjco.org/facebook.svg" alt="Facebook" width="24"
                                                height="24" style="display: block;">
                                        </a>
                                        <a href="https://www.twitter.com/AviatorJonahHQ"
                                            style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                            <img src="https://mail-assets.avjco.org/x.svg" alt="Twitter" width="24"
                                                height="24" style="display: block;">
                                        </a>
                                        <a href="https://www.instagram.com/AviatorJonahHQ"
                                            style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                            <img src="https://mail-assets.avjco.org/instagram.svg" alt="Instagram" width="24"
                                                height="24" style="display: block;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin-top: 24px; font-size: 14px; color: #cccccc;">© 2025 AviatorJonah, LLC. - All rights
                                reserved.</p>
                            <p style="margin-top: 16px; font-size: 12px; color: #cccccc;">
                                Need immediate assistance? Contact us at
                                <a href="mailto:support@avjco.org" style="color: #ffffff;">support@avjco.org</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `;
};

export default generateConfirmationEmailIssue;
