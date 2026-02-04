const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB || 'reps-egypt');
    const collection = database.collection('page_settings');

    const newPages = [
        { pageId: 'partners', name: 'Partners', path: '/partners', category: 'footer', order: 2, icon: '🤝', isVisible: true },
        { pageId: 'jobs', name: 'Jobs', path: '/jobs', category: 'footer', order: 3, icon: '💼', isVisible: true }
    ];

    for (const page of newPages) {
        const existing = await collection.findOne({ pageId: page.pageId });
        if (!existing) {
            await collection.insertOne({
                ...page,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log(`Successfully inserted ${page.name} page settings.`);
        } else {
            console.log(`${page.name} page settings already exist.`);
        }
    }

  } catch (error) {
    console.error('Error migrating:', error);
  } finally {
    await client.close();
  }
}

run();
