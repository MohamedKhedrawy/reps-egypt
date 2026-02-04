const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB || 'reps-egypt');
    const collection = database.collection('page_settings');

    // Update member-benefits to footer
    await collection.updateOne(
        { pageId: 'member-benefits' },
        { 
            $set: { 
                category: 'footer', 
                order: 4, // After existing footer items
                updatedAt: new Date() 
            } 
        }
    );
    console.log('Moved Benefits to footer.');

    // Update standards to footer
    await collection.updateOne(
        { pageId: 'standards' },
        { 
            $set: { 
                category: 'footer', 
                order: 5, // After Benefits
                updatedAt: new Date() 
            } 
        }
    );
    console.log('Moved Standards to footer.');

  } catch (error) {
    console.error('Error migrating:', error);
  } finally {
    await client.close();
  }
}

run();
