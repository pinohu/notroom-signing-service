/**
 * Test different request format variations for Emailit.com API
 */

const API_KEY = 'em_Rdv81BisdMCws2bkTT2LqSPDruAeg7iC';
const API_URL = 'https://api.emailit.com/v1';
const TEST_EMAIL = process.argv[2] || 'support@notroom.com';

async function testFormat(name, body) {
  console.log(`\n${name}`);
  console.log('─'.repeat(50));
  console.log('Request body:', JSON.stringify(body, null, 2));
  
  try {
    const response = await fetch(`${API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log('✅ SUCCESS!');
      try {
        const result = JSON.parse(responseText);
        console.log('Response:', JSON.stringify(result, null, 2));
      } catch (e) {
        console.log('Response:', responseText);
      }
      return true;
    } else {
      console.log('❌ FAILED');
      // Try to extract error message
      try {
        const errorJson = JSON.parse(responseText);
        console.log('Error:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        // Look for error message in HTML
        const errorMatch = responseText.match(/<h2>(.*?)<\/h2>/);
        if (errorMatch) {
          console.log('Error:', errorMatch[1]);
        } else {
          console.log('Error Response (first 500 chars):', responseText.substring(0, 500));
        }
      }
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return false;
  }
}

(async () => {
  console.log('🧪 Testing Emailit.com API Format Variations\n');
  console.log(`📧 Test Email: ${TEST_EMAIL}\n`);

  // Test 1: Basic format with plain email
  await testFormat('Test 1: Plain email address for "from"', {
    from: 'noreply@notroom.com',
    to: TEST_EMAIL,
    subject: 'Test 1: Plain Email Format',
    html: '<h1>Test</h1><p>Plain email format test.</p>'
  });

  // Test 2: With text field
  await testFormat('Test 2: Adding "text" field', {
    from: 'noreply@notroom.com',
    to: TEST_EMAIL,
    subject: 'Test 2: With Text Field',
    text: 'Plain text version',
    html: '<h1>Test</h1><p>With text field.</p>'
  });

  // Test 3: With "message" instead of "html"
  await testFormat('Test 3: Using "message" instead of "html"', {
    from: 'noreply@notroom.com',
    to: TEST_EMAIL,
    subject: 'Test 3: Message Field',
    message: '<h1>Test</h1><p>Using message field.</p>'
  });

  // Test 4: With "content" instead of "html"
  await testFormat('Test 4: Using "content" instead of "html"', {
    from: 'noreply@notroom.com',
    to: TEST_EMAIL,
    subject: 'Test 4: Content Field',
    content: '<h1>Test</h1><p>Using content field.</p>'
  });

  // Test 5: With "body" instead of "html"
  await testFormat('Test 5: Using "body" instead of "html"', {
    from: 'noreply@notroom.com',
    to: TEST_EMAIL,
    subject: 'Test 5: Body Field',
    body: '<h1>Test</h1><p>Using body field.</p>'
  });

  // Test 6: Minimal required fields only
  await testFormat('Test 6: Minimal fields (from, to, subject, html)', {
    from: 'noreply@notroom.com',
    to: TEST_EMAIL,
    subject: 'Test 6: Minimal',
    html: '<p>Minimal test.</p>'
  });

  console.log('\n\n📋 Summary:');
  console.log('─'.repeat(50));
  console.log('If all tests failed with 422, the issue might be:');
  console.log('1. The "from" email domain needs to be verified in Emailit.com');
  console.log('2. The API key might not have permission to send from this domain');
  console.log('3. Additional required fields might be needed');
  console.log('4. Check Emailit.com dashboard for domain verification status');
})();

