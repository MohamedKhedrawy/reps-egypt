const { getUserStats, getUsersPaginated } = require('../src/lib/user');
const { MongoClient } = require('mongodb');

// Mock clientPromise for the script environment if needed, 
// but since we are running in node, we might need to handle the import of clientPromise differently 
// or just rely on the fact that src/lib/mongodb.js uses process.env.
// However, src/lib/user.js imports clientPromise. 
// Let's try to run it using a temporary script that imports the lib functions.
// We need to make sure we use the right environment variables.

require('dotenv').config({ path: '.env.local' });

async function verify() {
    try {
        console.log('Verifying getUserStats...');
        const stats = await getUserStats();
        console.log('Stats:', stats);

        if (stats.activeTrainers === undefined || stats.activeTrainees === undefined) {
            console.error('FAILED: Stats missing required fields.');
        } else {
            console.log('PASSED: Stats structure is correct.');
        }

        console.log('Verifying getUsersPaginated for coaches...');
        const coaches = await getUsersPaginated({ role: 'trainer', status: 'approved' }, { limit: 4 });
        console.log('Coaches found:', coaches.length);
        
        if (coaches.length > 0) {
            const trainer = coaches[0];
            console.log('Sample Trainer:', {
                id: trainer._id,
                name: trainer.fullName,
                specialization: trainer.specialization,
                repsId: trainer.repsId
            });
        }

        console.log('Verification Complete.');
        process.exit(0);
    } catch (error) {
        console.error('Verification Error:', error);
        process.exit(1);
    }
}

verify();
