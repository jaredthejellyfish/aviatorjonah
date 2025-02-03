export const generateNotificationIssue = (
	name: string,
	email: string,
	issueSummary: string,
	issueCategory: string,
) => {
	return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Issue Report</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="width: 100%; padding: 20px 0; background-color: #f5f5f5;">
        <!-- Email Container -->
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background-color: #0066cc; padding: 20px; border-radius: 4px 4px 0 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Issue Report</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 20px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 12px; border: 1px solid #dee2e6; width: 120px; background-color: #f8f9fa;">
                            <strong>Reporter:</strong>
                        </td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">
                            ${name}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #f8f9fa;">
                            <strong>Email:</strong>
                        </td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">
                            ${email}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #f8f9fa;">
                            <strong>Summary:</strong>
                        </td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">
                            ${issueSummary}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #f8f9fa;">
                            <strong>Category:</strong>
                        </td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">
                            ${issueCategory}
                        </td>
                    </tr>
                </table>
                
                <div style="color: #666666; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                    This is an automated notification. Please do not reply to this email.
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 4px 4px; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; color: #666666; font-size: 14px;">
                    © ${new Date().getFullYear()} AviatorJonah All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
};
