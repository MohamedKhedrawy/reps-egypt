import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * Get the qualification changes collection
 */
export async function getQualificationChangesCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection('qualification_changes');
}

/**
 * Get qualification changes with filters
 */
export async function getQualificationChanges(filter = {}, options = {}) {
    const collection = await getQualificationChangesCollection();
    const { limit = 50, skip = 0, sort = { createdAt: -1 } } = options;
    return collection.find(filter).sort(sort).skip(skip).limit(limit).toArray();
}

/**
 * Get pending qualification changes including trainer info
 * We manually join with users for now or fetch relevant user data
 */
export async function getPendingQualificationChanges() {
    const changes = await getQualificationChanges({ status: 'pending' });
    
    // We need trainer details (name, email)
    // In a real app, we might use $lookup aggregation, but separate calls are fine for now
    const client = await clientPromise;
    const users = client.db(DB_NAME).collection('users');
    
    const enrichedChanges = await Promise.all(changes.map(async (change) => {
        const trainer = await users.findOne({ _id: new ObjectId(change.trainerId) });
        return {
            ...change,
            trainerName: trainer?.fullName || 'Unknown',
            trainerEmail: trainer?.email || 'Unknown',
        };
    }));

    return enrichedChanges;
}

/**
 * Update the status of a qualification change
 * If approved, this should also update the trainer's actual profile
 */
export async function updateQualificationChangeStatus(id, status, adminId) {
    const collection = await getQualificationChangesCollection();
    const changeId = new ObjectId(id);
    
    const change = await collection.findOne({ _id: changeId });
    if (!change) throw new Error('Change request not found');

    // Update the request status
    await collection.updateOne(
        { _id: changeId },
        { 
            $set: { 
                status, 
                reviewedAt: new Date(),
                reviewedBy: adminId 
            }
        }
    );

    // If approved, apply changes to user profile
    if (status === 'approved') {
        const client = await clientPromise;
        const users = client.db(DB_NAME).collection('users');
        
        // Assuming newQualifications contains the array of file names or data
        await users.updateOne(
            { _id: new ObjectId(change.trainerId) },
            { 
                $set: { 
                    uploadedFiles: change.newQualifications, // or qualifications: ... depending on schema
                    // You might merge or replace depending on business logic
                    updatedAt: new Date()
                }
            }
        );
    }
    
    return true;
}

/**
 * Create a new qualification change request
 */
export async function createQualificationChange(trainerId, previousQualifications, newQualifications) {
    const collection = await getQualificationChangesCollection();
    return collection.insertOne({
        trainerId,
        previousQualifications,
        newQualifications,
        status: 'pending',
        createdAt: new Date(),
    });
}
