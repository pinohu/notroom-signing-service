/**
 * Test different request formats for Emailit.com /emails endpoint
 */

const API_KEY = 'em_Rdv81BisdMCws2bkTT2LqSPDruAeg7iC';
const API_URL = 'https://api.emailit.com/v1';
const TEST_EMAIL = process.argv[2] || 'test@example.com';

const formats = [
  {
    name: 'Format 1: Standard fields',
    body: {
      from: 'noreply@notroom.com',
      to: TEST_EMAIL,
      subject: 'Test Email',
      html: '<h1>Test</h1>'
    }
  },
  {
    name: 'Format 2: sender/recipient',
    body: {
      sender: 'noreply@notroom.com',
      recipient: TEST_EMAIL,
      subject: 'Test Email',
      html: '<h1>Test</h1>'
    }
  },
  {
    name: 'Format 3: with text field',
    body: {
      from: 'noreply@notroom.com',
      to: TEST_EMAIL,
      subject: 'Test Email',
      text: 'Test email',
      html: '<h1>Test</h1>'
    }
  },
  {
    name: 'Format 4: message field',
    body: {
      from: 'noreply@notroom.com',
      to: TEST_EMAIL,
      subject: 'Test Email',
      message: '<h1>Test</h1>'
    }
  },
  {
    name: 'Format 5: content field',
    body: {
      from: 'noreply@notroom.com',
      to: TEST_EMAIL,
      subject: 'Test Email',
      content: '<h1>Test</h1>'
    }
  },
  {
    name: 'Format 6: body field',
    body: {
      from: 'noreply@notroom.com',
      to: TEST_EMAIL,
      subject: 'Test Email',
      body: '<h1>Test</h1>'
    }
  },
  {
    name: 'Format 7: email object',
    body: {
      email: {
        from: 'noreply@notroom.com',
        to: TEST_EMAIL,
        subject: 'Test Email',
        html: '<h1>Test</h1>'
      }
    }
  }
];

async function testFormat(format) {
  try {
    const response = await fetch(`${API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(format.body),
    });

    const responseText = await response.text();
    
    if (response.ok) {
      console.log(`✅ ${format.name}: SUCCESS (${response.status})`);
      try {
        const json = JSON.parse(responseText);
        console.log('   Response:', JSON.stringify(json, null, 2));
      } catch (e) {
        console.log('   Response:', responseText.substring(0, 200));
      }
      return true;
    } else {
      console.log(`❌ ${format.name}: ${response.status} ${response.statusText}`);
      if (response.status === 422) {
        try {
          const error = JSON.parse(responseText);
          console.log('   Error details:', JSON.stringify(error, null, 2));
        } catch (e) {
          console.log('   Error:', responseText.substring(0, 200));
        }
      }
      return false;
    }
  } catch (error) {
    console.log(`❌ ${format.name}: ERROR - ${error.message}`);
    return false;
  }
}

(async () => {
  console.log('🧪 Testing Different Request Formats for Emailit.com /emails Endpoint\n');
  console.log(`📧 Test Email: ${TEST_EMAIL}\n`);
  
  for (const format of formats) {
    await testFormat(format);
    console.log('');
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between requests
  }
  
  console.log('\n📋 If all formats failed with 422, check Emailit.com API docs for exact field requirements.');
})();

