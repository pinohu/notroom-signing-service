/**
 * Test script for Emailit.com API integration
 * Run with: node test-email-service.js
 */

const API_KEY = 'em_Rdv81BisdMCws2bkTT2LqSPDruAeg7iC';
const API_URL = 'https://api.emailit.com/v1';
const TEST_EMAIL = process.argv[2] || 'test@example.com'; // Pass email as argument or use default

console.log('🧪 Testing Emailit.com API Integration\n');
console.log(`📧 Test Email: ${TEST_EMAIL}`);
console.log(`🔗 API URL: ${API_URL}\n`);

async function testEmailAPI() {
  // Test 1: Try standard REST API format
  console.log('Test 1: Standard REST API Format (Bearer Token)');
  console.log('─'.repeat(50));
  
  try {
    const response = await fetch(`${API_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: 'noreply@notroom.com',
        to: TEST_EMAIL,
        subject: 'Test Email from Notroom - Emailit.com Integration',
        html: `
          <h1>Test Email</h1>
          <p>This is a test email from the Emailit.com integration.</p>
          <p>If you receive this, the API integration is working correctly!</p>
        `
      }),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS! Email sent successfully.');
      console.log('Response:', JSON.stringify(result, null, 2));
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ FAILED');
      console.log('Error Response:', errorText);
      
      // Try to parse as JSON
      try {
        const errorJson = JSON.parse(errorText);
        console.log('Error Details:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        // Not JSON, already logged as text
      }
      
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    console.log('Stack:', error.stack);
    return false;
  }
}

async function testAlternativeFormats() {
  console.log('\n\nTest 2: Alternative API Format (X-API-Key Header)');
  console.log('─'.repeat(50));
  
  try {
    const response = await fetch(`${API_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({
        from: 'noreply@notroom.com',
        to: TEST_EMAIL,
        subject: 'Test Email - Alternative Format',
        html: '<h1>Test</h1><p>Alternative auth format test.</p>'
      }),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS with X-API-Key format!');
      console.log('Response:', JSON.stringify(result, null, 2));
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ FAILED with X-API-Key format');
      console.log('Error:', errorText);
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return false;
  }
}

async function testDifferentEndpoints() {
  const endpoints = [
    '/send',
    '/emails',
    '/email/send',
    '/api/send',
    '/v1/send'
  ];

  console.log('\n\nTest 3: Testing Different Endpoint Paths');
  console.log('─'.repeat(50));

  for (const endpoint of endpoints) {
    try {
      console.log(`\nTrying: ${API_URL}${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          from: 'noreply@notroom.com',
          to: TEST_EMAIL,
          subject: 'Endpoint Test',
          html: '<p>Test</p>'
        }),
      });

      if (response.ok) {
        console.log(`✅ SUCCESS with endpoint: ${endpoint}`);
        const result = await response.json();
        console.log('Response:', JSON.stringify(result, null, 2));
        return { success: true, endpoint };
      } else {
        console.log(`❌ Failed (${response.status})`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  return { success: false };
}

// Run tests
(async () => {
  console.log('Starting Emailit.com API tests...\n');
  
  const test1 = await testEmailAPI();
  
  if (!test1) {
    console.log('\n⚠️  Standard format failed, trying alternatives...');
    const test2 = await testAlternativeFormats();
    
    if (!test2) {
      await testDifferentEndpoints();
    }
  }
  
  console.log('\n\n📋 Summary:');
  console.log('─'.repeat(50));
  console.log('If all tests failed, you may need to:');
  console.log('1. Check Emailit.com API documentation for correct endpoint');
  console.log('2. Verify the API key is correct');
  console.log('3. Check if Emailit.com requires domain verification');
  console.log('4. Verify the "from" email address is authorized');
  console.log('\nCheck your email inbox (and spam folder) for test emails.');
})();

