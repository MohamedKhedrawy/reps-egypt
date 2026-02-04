import { createProgram, getProgramsCollection } from '../src/lib/programs.js';
import clientPromise from '../src/lib/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';

const specializations = [
    {
        title: "Personal Trainer",
        category: "Certification",
        desc: "Design and implement personalized exercise programs for individuals to achieve their fitness goals.",
        image_query: "personal trainer gym"
    },
    {
        title: "Gym Instructor",
        category: "Certification",
        desc: "Supervise gym floors, induct new members, and provide general advice on exercise performance.",
        image_query: "gym instructor"
    },
    {
        title: "Group Fitness Instructor",
        category: "Certification",
        desc: "Lead motivating group exercise classes with emphasis on technique and safety.",
        image_query: "group fitness class"
    },
    {
        title: "Group Fitness Instructor Freestyle",
        category: "Certification",
        desc: "Choreograph and instruct freestyle group fitness classes to music.",
        image_query: "aerobics class"
    },
    {
        title: "Yoga Teacher",
        category: "Diploma",
        desc: "Teach yoga principles, asanas, and philosophy to enhance physical and mental well-being.",
        image_query: "yoga teacher"
    },
    {
        title: "Pilates Teacher",
        category: "Diploma",
        desc: "Instruct Pilates matwork and apparatus exercises to improve strength, flexibility, and posture.",
        image_query: "pilates reformer"
    },
    {
        title: "Pilates Instructor Comprehensive",
        category: "Diploma",
        desc: "Full comprehensive Pilates certification covering all apparatus and matwork at an advanced level.",
        image_query: "advanced pilates"
    },
    {
        title: "Aqua Fitness Instructor",
        category: "Certification",
        desc: "Lead safe and effective water-based exercise classes for various populations.",
        image_query: "aqua aerobics"
    },
    {
        title: "Children's Fitness Instructor",
        category: "Specialty",
        desc: "Design fun and safe fitness activities specifically tailored for children and adolescents.",
        image_query: "kids fitness"
    },
    {
        title: "Advanced Exercise Specialist",
        category: "Diploma",
        desc: "Work with clients with specific medical conditions or risk factors through exercise referral.",
        image_query: "medical fitness rehab"
    }
];

// Helper to get a realistic image (using Unsplash source for demo)
function getImage(query) {
    return `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},fitness`;
}
// Since source.unsplash is deprecated/unreliable for specific queries without API key sometimes, 
// let's use the static ones we had or generic ones, or keep using source.unsplash hoping it redirects.
// Better: Use a reliable placeholder service or the previous hardcoded images where they map.
// For now I'll map them to reliable Unsplash IDs where possible or generic keywords.

const images = [
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800", // PT
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800", // Gym
    "https://images.unsplash.com/photo-1574680096141-983200526388?auto=format&fit=crop&w=800", // Group
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800", // Freestyle
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800", // Yoga
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800", // Pilates (reuse yoga ish)
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800", // Pilates comp
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800", // Aqua
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800", // Kids (generic gym)
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800", // Specialist
];

async function seed() {
    try {
        const collection = await getProgramsCollection();
        
        console.log('Clearing existing programs...');
        await collection.deleteMany({}); // Replace all

        console.log('Seeding specializations...');
        const itemsToInsert = specializations.map((item, idx) => ({
            ...item,
            // Assign image from list or fallback
            img: images[idx] || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800", 
            instructor: "Internal", // Generic instructor
            // NO PRICE
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        const result = await collection.insertMany(itemsToInsert);

        console.log(`Seeded ${result.insertedCount} specializations.`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
