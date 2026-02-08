import clientPromise from './mongodb.js';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * Get the organization emails collection
 * @returns {Promise<import('mongodb').Collection>}
 */
export async function getOrganizationEmailsCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection('organizationEmails');
}

/**
 * Get all organization emails
 * @returns {Promise<object[]>}
 */
export async function getOrganizationEmails() {
    const collection = await getOrganizationEmailsCollection();
    return collection.find({}).sort({ isDefault: -1, createdAt: -1 }).toArray();
}

/**
 * Add a new organization email
 * @param {object} emailData - { email, label, isDefault }
 * @returns {Promise<import('mongodb').InsertOneResult>}
 */
export async function addOrganizationEmail({ email, label, isDefault = false }) {
    const collection = await getOrganizationEmailsCollection();
    
    // If setting as default, unset any existing default
    if (isDefault) {
        await collection.updateMany({}, { $set: { isDefault: false } });
    }
    
    return collection.insertOne({
        email: email.toLowerCase(),
        label: label || email.split('@')[0],
        isDefault,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

/**
 * Delete an organization email by ID
 * @param {string} id
 * @returns {Promise<import('mongodb').DeleteResult>}
 */
export async function deleteOrganizationEmail(id) {
    const { ObjectId } = await import('mongodb');
    const collection = await getOrganizationEmailsCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
}

/**
 * Set an email as the default sender
 * @param {string} id
 * @returns {Promise<import('mongodb').UpdateResult>}
 */
export async function setDefaultEmail(id) {
    const { ObjectId } = await import('mongodb');
    const collection = await getOrganizationEmailsCollection();
    
    // Unset all defaults first
    await collection.updateMany({}, { $set: { isDefault: false } });
    
    // Set the new default
    return collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isDefault: true, updatedAt: new Date() } }
    );
}

/**
 * Get the default organization email
 * @returns {Promise<object|null>}
 */
export async function getDefaultEmail() {
    const collection = await getOrganizationEmailsCollection();
    return collection.findOne({ isDefault: true });
}

/**
 * Find organization email by ID
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function findOrganizationEmailById(id) {
    const { ObjectId } = await import('mongodb');
    const collection = await getOrganizationEmailsCollection();
    return collection.findOne({ _id: new ObjectId(id) });
}
