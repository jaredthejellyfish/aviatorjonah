const generateNotificationBeta = ({
	name,
	email,
	country,
	aviation_experience,
	current_roles,
	discord,
}: {
	name: string;
	email: string;
	country: string;
	aviation_experience: string;
	current_roles: string;
	discord: string;
}) => `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
    <h2 style="color: #1b264f;">New CoPilot Beta Application</h2>
    <p>A new beta application has been received:</p>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px; margin: 20px 0;">
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Country:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${country}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Aviation Experience:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${aviation_experience}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Current Roles:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${current_roles}</td>
        </tr>
        ${
					discord
						? `
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Discord:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${discord}</td>
        </tr>
        `
						: ""
				}
    </table>
</body>
</html>`;

export default generateNotificationBeta;
