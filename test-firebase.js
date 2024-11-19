require('dotenv').config();
const { db } = require('./src/config/firebase');

async function testConnection() {
  try {
    // Try to write a test document
    const testRef = db.collection('test').doc('test');
    await testRef.set({
      test: 'Hello Firebase!',
      timestamp: new Date()
    });
    console.log('Successfully connected to Firebase!');

    // Read the document back
    const doc = await testRef.get();
    console.log('Test document data:', doc.data());

    // Clean up
    await testRef.delete();
  } catch (error) {
    console.error('Firebase connection test failed:', error);
  }
}

testConnection();