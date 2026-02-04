import { getUserStats, getUsersPaginated } from '../src/lib/user.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function verify() {
    try {
        console.log('Verifying getUserStats...');
        const stats = await getUserStats();
        console.log('Stats:', stats);

        if (stats.activeTrainers === undefined || stats.activeTrainees === undefined) {
            console.error('FAILED: Stats missing required fields.');
            process.exit(1);
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
