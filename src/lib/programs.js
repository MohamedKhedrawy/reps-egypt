import clientPromise from './mongodb.js';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * Get the programs collection
 */
export async function getProgramsCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection('programs');
}

/**
 * Get all programs with optional filters and pagination
 */
export async function getPrograms(filter = {}, options = {}) {
    const collection = await getProgramsCollection();
    const { limit = 50, skip = 0, sort = { createdAt: -1 } } = options;
    return collection.find(filter).sort(sort).skip(skip).limit(limit).toArray();
}

/**
 * Get featured programs for the home page (e.g., limit 3)
 */
export async function getFeaturedPrograms(limit = 3) {
    const collection = await getProgramsCollection();
    return collection.find({})
        .project({ title: 1, desc: 1, category: 1, instructor: 1, _id: 1 })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();
}

/**
 * Get total count of programs
 */
export async function getProgramsCount(filter = {}) {
    const collection = await getProgramsCollection();
    return collection.countDocuments(filter);
}

/**
 * Create a new program
 */
export async function createProgram(programData) {
    const collection = await getProgramsCollection();
    return collection.insertOne({
        ...programData,
        createdAt: new Date(),
        updatedAt: new Date()
    });
}
