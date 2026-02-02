import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * Get the news collection
 */
export async function getNewsCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection('news');
}

/**
 * Get all news articles
 */
export async function getNewsArticles(filter = {}, options = {}) {
    const news = await getNewsCollection();
    const { limit = 50, skip = 0, sort = { createdAt: -1 } } = options;
    return news.find(filter).sort(sort).skip(skip).limit(limit).toArray();
}

/**
 * Get published news articles (for public page)
 */
export async function getPublishedNews() {
    return getNewsArticles({ isPublished: true });
}

/**
 * Get a single news article by ID
 */
export async function getNewsById(id) {
    const news = await getNewsCollection();
    return news.findOne({ _id: new ObjectId(id) });
}

/**
 * Create a new news article
 */
export async function createNewsArticle(data) {
    const news = await getNewsCollection();
    const article = {
        title: data.title,
        category: data.category,
        description: data.description,
        imageUrl: data.imageUrl || null,
        isPublished: data.isPublished ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return news.insertOne(article);
}

/**
 * Update a news article
 */
export async function updateNewsArticle(id, data) {
    const news = await getNewsCollection();
    const updateData = { ...data, updatedAt: new Date() };
    delete updateData._id; // Don't try to update _id
    return news.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
}

/**
 * Delete a news article
 */
export async function deleteNewsArticle(id) {
    const news = await getNewsCollection();
    return news.deleteOne({ _id: new ObjectId(id) });
}

/**
 * Get news count
 */
export async function getNewsCount(filter = {}) {
    const news = await getNewsCollection();
    return news.countDocuments(filter);
}
