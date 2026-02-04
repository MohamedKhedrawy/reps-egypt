import { createProgram, getProgramsCollection } from '../src/lib/programs.js';
import clientPromise from '../src/lib/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';

// We don't strictly need to load dotenv here if we run with node --env-file=.env.local,
// but checking if env vars are present is good practice.

const programs = [
    { 
      title: "Advanced Hypertrophy", 
      category: "Certification", 
      desc: "Master the science of muscle growth with our comprehensive level 3 certification.",
      price: "$299",
      instructor: "Mike R.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      title: "Calisthenics Basics", 
      category: "Workshop", 
      desc: "Learn to control your bodyweight and build functional strength from the ground up.",
      price: "$99",
      instructor: "Sarah J.",
      img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop"
    },
    { 
      title: "Personal Trainer L4", 
      category: "Diploma", 
      desc: "The gold standard for aspiring personal trainers. Get accredited internationally.",
      price: "$899",
      instructor: "Dr. Samy",
      img: "https://images.unsplash.com/photo-1574680096141-983200526388?q=80&w=1469&auto=format&fit=crop"
    },
    { 
      title: "Sports Nutritionist", 
      category: "Certification", 
      desc: "Deep dive into performance nutrition and supplement strategies for elite athletes.",
      price: "$450",
      instructor: "Nour E.",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      title: "Powerlifting Coach", 
      category: "Workshop", 
      desc: "Perfect the Big Three. Learn technique, programming, and meet preparation.",
      price: "$199",
      instructor: "Ahmed A.",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      title: "Master Yoga Flow", 
      category: "Diploma", 
      desc: "200-hour RYT aligned curriculum focusing on transitions and breathwork.",
      price: "$1,200",
      instructor: "Sara M.",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
    },
];

async function seed() {
    try {
        const collection = await getProgramsCollection();
        const count = await collection.countDocuments();
        
        if (count > 0) {
            console.log(`Programs collection already has ${count} items. Skipping seed.`);
            process.exit(0);
        }

        console.log('Seeding programs...');
        const result = await collection.insertMany(programs.map(p => ({
            ...p,
            createdAt: new Date(),
            updatedAt: new Date()
        })));

        console.log(`Seeded ${result.insertedCount} programs.`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
