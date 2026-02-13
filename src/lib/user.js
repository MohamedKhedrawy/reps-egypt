import clientPromise from './mongodb.js';

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
 * Get next REPS ID (incremental counter)
 * @returns {Promise<number>}
 */
export async function getNextRepsId() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const countersCollection = db.collection('counters');
    
    const result = await countersCollection.findOneAndUpdate(
        { _id: 'repsId' },
        { $inc: { value: 1 } },
        { upsert: true, returnDocument: 'after' }
    );
    
    // If this is the first time, start from 1000
    if (!result.value) {
        await countersCollection.updateOne(
            { _id: 'repsId' },
            { $set: { value: 1000 } }
        );
        return 1000;
    }
    
    return result.value.value;
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
    
    // Generate next REPS ID
    const repsId = await getNextRepsId();
    
    const user = {
        // Core fields
        email: userData.email.toLowerCase(),
        password: userData.password,
        fullName: userData.fullName,
        repsId: repsId, // Auto-incremented REPS ID starting from 1000
        
        // Contact info
        phone: userData.phone || null,
        
        // Personal info
        birthDate: userData.birthDate || null,
        age: userData.age ? parseInt(userData.age) : null,
        gender: userData.gender || null,
        governorate: userData.governorate || null,
        
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
    return users.find(filter)
        .project({ password: 0, alerts: 0 })
        .toArray();
}

/**
 * Get paginated users with search
 */
export async function getUsersPaginated(filter = {}, options = {}) {
    const users = await getUsersCollection();
    const { limit = 20, skip = 0, sort = { createdAt: -1 } } = options;
    return users.find(filter)
        .project({ password: 0 }) // Exclude password
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray();
}

/**
 * Get users with pending status
 */
export async function getPendingUsers() {
    return getUsersPaginated({ status: 'pending' });
}

/**
 * Update user status (approve/reject)
 * When approving a trainer, assign a REPS ID
 */
export async function updateUserStatus(id, status, reviewedBy = null) {
    const { ObjectId } = await import('mongodb');
    const users = await getUsersCollection();
    
    // Prepare update data
    const updateData = { 
        status,
        reviewedAt: new Date(),
        reviewedBy,
        updatedAt: new Date()
    };
    
    // If approving, check if user is a trainer and assign REPS ID
    if (status === 'approved') {
        const user = await users.findOne({ _id: new ObjectId(id) });
        if (user && user.role === 'trainer' && !user.repsId) {
            updateData.repsId = await getNextRepsId();
        }
    }
    
    return users.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
}

/**
 * Delete a user by ID
 */
export async function deleteUser(id) {
    const { ObjectId } = await import('mongodb');
    const users = await getUsersCollection();
    return users.deleteOne({ _id: new ObjectId(id) });
}

/**
 * Get user counts for stats
 */
export async function getUserStats() {
    const users = await getUsersCollection();
    const [totalUsers, pendingApprovals, activeTrainers, activeTrainees] = await Promise.all([
        users.countDocuments(),
        users.countDocuments({ status: 'pending' }),
        users.countDocuments({ status: 'approved', role: 'trainer' }),
        users.countDocuments({ role: 'trainee' }),
    ]);
    return { totalUsers, pendingApprovals, activeTrainers, activeTrainees };
}

/**
 * Search users by name or email
 */
export async function searchUsers(query, filter = {}) {
    const users = await getUsersCollection();
    const searchFilter = {
        ...filter,
        $or: [
            { fullName: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
        ]
    };
    return users.find(searchFilter)
        .project({ password: 0 })
        .limit(50)
        .toArray();
}

/**
 * Get public coaches data (optimized projection)
 */
export async function getPublicCoaches(filter = { role: 'trainer', status: 'approved' }, options = {}) {
    // Default sort by creation date (newest first)
    const { limit = 0, skip = 0, sort = { createdAt: -1 } } = options;
    const users = await getUsersCollection();
    
    let query = users.find(filter)
        .project({ 
            fullName: 1, 
            specialization: 1, 
            profilePhoto: 1, // Included for home page display
            repsId: 1, 
            governorate: 1, 
            experience: 1, 
            socialMedia: 1 // Keep for profile links
        })
        .sort(sort);

    if (skip > 0) query = query.skip(skip);
    if (limit > 0) query = query.limit(limit);
        
    return query.toArray();
}
