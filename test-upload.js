// Simple test to verify upload API endpoint
const fs = require('fs');
const path = require('path');

// Create a test image file (1x1 pixel PNG)
const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64');

async function testUpload() {
  try {
    const formData = new FormData();
    const blob = new Blob([testImageBuffer], { type: 'image/png' });
    formData.append('file', blob, 'test.png');

    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Upload test successful:', result);
    } else {
      console.log('❌ Upload test failed:', result);
    }
  } catch (error) {
    console.error('❌ Upload test error:', error);
  }
}

console.log('Testing upload endpoint...');
testUpload();
