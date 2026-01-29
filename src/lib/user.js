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
 * Create a new user with extended fields
 * @param {object} userData - User data from registration
 * @returns {Promise<import('mongodb').InsertOneResult>}
 */
export async function createUser(userData) {
    const users = await getUsersCollection();
    
    const user = {
        // Core fields
        email: userData.email.toLowerCase(),
        password: userData.password,
        fullName: userData.fullName,
        
        // Contact info
        phone: userData.phone || null,
        
        // Personal info
        birthDate: userData.birthDate || null,
        age: userData.age ? parseInt(userData.age) : null,
        
        // Social media
        socialMedia: {
            facebook: userData.socialMedia?.facebook || null,
            instagram: userData.socialMedia?.instagram || null,
            youtube: userData.socialMedia?.youtube || null,
            linkedin: userData.socialMedia?.linkedin || null,
        },
        
        // Professional info
        specialization: userData.specialization || null,
        
        // Terms & status
        termsAccepted: userData.termsAccepted || false,
        role: userData.role || 'trainer', // trainer or trainee
        status: 'pending', // pending, approved, rejected
        
        // Timestamps
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    
    return users.insertOne(user);
}

/**
 * Update a user by ID
 * @param {string} id 
 * @param {object} updateData 
 * @returns {Promise<import('mongodb').UpdateResult>}
 */
export async function updateUser(id, updateData) {
    const { ObjectId } = await import('mongodb');
    const users = await getUsersCollection();
    return users.updateOne(
        { _id: new ObjectId(id) },
        { 
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }
    );
}

/**
 * Get all users with optional filters
 * @param {object} filter - MongoDB filter
 * @returns {Promise<object[]>}
 */
export async function getUsers(filter = {}) {
    const users = await getUsersCollection();
    return users.find(filter).toArray();
}
