/**
 * Direct test for Emailit.com API with correct format
 */

const API_KEY = 'em_Rdv81BisdMCws2bkTT2LqSPDruAeg7iC';
const API_URL = 'https://api.emailit.com/v1';
const TEST_EMAIL = process.argv[2] || 'support@notroom.com';

console.log('🧪 Testing Emailit.com API with correct format\n');
console.log(`📧 Test Email: ${TEST_EMAIL}\n`);

async function testEmailitAPI() {
  try {
    console.log('Sending test email...');
    const response = await fetch(`${API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Notroom <noreply@notroom.com>',
        to: TEST_EMAIL,
        subject: 'Test Email from Notroom - Emailit.com Integration',
        message: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb;">Test Email</h1>
                <p>This is a test email from the Emailit.com integration.</p>
                <p>If you receive this, the API integration is working correctly!</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
            </body>
          </html>
        `
      }),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    
    const responseText = await response.text();
    
    if (response.ok) {
      try {
        const result = JSON.parse(responseText);
        console.log('✅ SUCCESS! Email sent successfully.');
        console.log('Response:', JSON.stringify(result, null, 2));
        return true;
      } catch (e) {
        console.log('✅ SUCCESS! Email sent successfully.');
        console.log('Response:', responseText);
        return true;
      }
    } else {
      console.log('❌ FAILED');
      console.log('Error Response:', responseText);
      
      // Try to parse as JSON
      try {
        const errorJson = JSON.parse(responseText);
        console.log('Error Details:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        // Not JSON, already logged as text
      }
      
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    if (error.stack) {
      console.log('Stack:', error.stack);
    }
    return false;
  }
}

// Run test
(async () => {
  const success = await testEmailitAPI();
  
  console.log('\n📋 Summary:');
  console.log('─'.repeat(50));
  if (success) {
    console.log('✅ Email sent successfully!');
    console.log('📬 Check your email inbox (and spam folder) for the test email.');
  } else {
    console.log('❌ Email sending failed.');
    console.log('\nPossible issues:');
    console.log('1. Verify the API key is correct');
    console.log('2. Check if Emailit.com requires domain verification');
    console.log('3. Verify the "from" email address is authorized');
    console.log('4. Check Emailit.com dashboard for account status');
  }
})();

