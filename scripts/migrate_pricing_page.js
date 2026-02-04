const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB || 'reps-egypt');
    const collection = database.collection('page_settings');

    const pricingPage = {
      pageId: 'pricing',
      name: 'Pricing',
      path: '/pricing',
      category: 'main',
      order: 1.5,
      icon: '💎',
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const existing = await collection.findOne({ pageId: 'pricing' });
    if (!existing) {
      await collection.insertOne(pricingPage);
      console.log('Successfully inserted Pricing page settings.');
    } else {
      console.log('Pricing page settings already exist.');
    }

  } catch (error) {
    console.error('Error migrating:', error);
  } finally {
    await client.close();
  }
}

run();
