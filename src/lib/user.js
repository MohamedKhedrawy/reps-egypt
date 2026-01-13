import clientPromise from './mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * Get the users collection
 * @returns {Promise<import('mongodb').Collection>}
 */
export async function getUsersCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection('users');
}

/**
 * Find a user by email
 * @param {string} email 
 * @returns {Promise<object|null>}
 */
export async function findUserByEmail(email) {
    const users = await getUsersCollection();
    return users.findOne({ email: email.toLowerCase() });
}

/**
 * Find a user by ID
 * @param {string} id 
 * @returns {Promise<object|null>}
 */
export async function findUserById(id) {
    const { ObjectId } = await import('mongodb');
    const users = await getUsersCollection();
    return users.findOne({ _id: new ObjectId(id) });
}

/**
 * Create a new user
 * @param {object} userData - { email, password (hashed), fullName }
 * @returns {Promise<import('mongodb').InsertOneResult>}
 */
export async function createUser(userData) {
    const users = await getUsersCollection();
    return users.insertOne({
        ...userData,
        email: userData.email.toLowerCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}
