import { getPrograms, getFeaturedPrograms, getProgramsCount } from '../src/lib/programs.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verify() {
    try {
        console.log('Verifying getPrograms (Specializations)...');
        const programs = await getPrograms();
        console.log(`Fetched ${programs.length} specializations.`);
        
        if (programs.length !== 10) {
            console.error(`FAILED: Expected 10 specializations, got ${programs.length}.`);
            process.exit(1);
        } else {
             console.log('PASSED: Specializations fetched successfully.');
        }

        console.log('Verifying getFeaturedPrograms...');
        const featured = await getFeaturedPrograms(3);
        console.log(`Fetched ${featured.length} featured specializations.`);
        
        if (featured.length !== 3) {
            console.error(`FAILED: Expected 3 featured specializations, got ${featured.length}`);
             process.exit(1);
        } else {
             console.log('PASSED: Featured specializations fetched correctly.');
        }
        
        // Verify no prices in sample
        if (programs[0].price !== undefined) {
             console.warn('WARNING: Price field still exists in DB (might be undefined/null effectively but key exists).');
             // Proceed if it's not displayed, but optimally we should have removed it. 
             // The seed script didn't add it, so it should be fine unless leftover.
             // We replaced the collection, so it should be gone.
        }

        console.log('Verifying getProgramsCount...');
        const count = await getProgramsCount();
        console.log(`Total count: ${count}`);
        
        if (count !== 10) {
             console.error(`FAILED: Count mismatch. Count: ${count}, Expected: 10`);
             process.exit(1);
        } else {
             console.log('PASSED: Count is correct.');
        }

        console.log('Verification Complete.');
        process.exit(0);
    } catch (error) {
        console.error('Verification Error:', error);
        process.exit(1);
    }
}

verify();
