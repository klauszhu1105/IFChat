const path = require('path');
const { RespParamErr, RespServerErr, RespCreateErr, RespUpdateErr } = require('../../model/error');
const { RespError, RespSuccess, RespData } = require('../../model/resp');
const { Query } = require('../../db/query');
const { generateRandomString, notExitCreate } = require('../../utils/utils');

/**
 * Function to create a new post
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Promise} A Promise that resolves to a JSON object indicating success or failure
 */
async function CreatePost(req, res) {
    let { content, username, publishTime } = req.body;
    if (!content || !username || !publishTime) {
        return RespError(res, RespParamErr);
    }

    // Generate a unique post ID
    let postId = generateRandomString(32);

    // Prepare SQL query to insert the post into the database
    let sql = `INSERT INTO post (id, content, username, publish_time, likes) VALUES (?, ?, ?, ?, 0)`;
    let values = [postId, content, username, publishTime];

    // Execute the query and handle any errors
    try {
        await Query(sql, values);
    } catch (err) {
        console.error(err);
        return RespError(res, RespServerErr);
    }

    // Return a success response
    return RespSuccess(res);
}

/**
 * Function to retrieve all posts
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Promise} A Promise that resolves to a JSON object containing all posts
 */
async function GetPosts(req, res) {
    // Prepare SQL query to fetch all posts from the database
    let sql = `SELECT id, content, username, publish_time, likes FROM post ORDER BY publish_time DESC`;

    // Execute the query and handle any errors
    try {
        let { results } = await Query(sql);
        return RespData(res, results);
    } catch (err) {
        console.error(err);
        return RespError(res, RespServerErr);
    }
}

/**
 * Function to like a post
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Promise} A Promise that resolves to a JSON object indicating success or failure
 */
async function LikePost(req, res) {
    let { postId } = req.body;
    if (!postId) {
        return RespError(res, RespParamErr);
    }

    // Check if the post exists
    let sql = `SELECT * FROM post WHERE id = ?`;
    let { results } = await Query(sql, [postId]);
    if (results.length === 0) {
        return RespError(res, RespUpdateErr);
    }

    // Increment the likes count
    sql = `UPDATE post SET likes = likes + 1 WHERE id = ?`;
    await Query(sql, [postId]);

    // Fetch the updated post data
    sql = `SELECT id, content, username, publish_time, likes FROM post WHERE id = ?`;
    ( { results } = await Query(sql, [postId]) );
    let updatedPost = results[0];

    // Return the updated post data
    return RespData(res, updatedPost);
}

/**
 * Function to unlike a post
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Promise} A Promise that resolves to a JSON object indicating success or failure
 */
async function UnlikePost(req, res) {
    let { postId } = req.body;
    if (!postId) {
        return RespError(res, RespParamErr);
    }

    // Check if the post exists
    let sql = `SELECT * FROM post WHERE id = ?`;
    let { results } = await Query(sql, [postId]);
    if (results.length === 0) {
        return RespError(res, RespUpdateErr);
    }

    // Decrement the likes count
    sql = `UPDATE post SET likes = likes - 1 WHERE id = ?`;
    await Query(sql, [postId]);

    // Fetch the updated post data
    sql = `SELECT id, content, username, publish_time, likes FROM post WHERE id = ?`;
    ({ results } = await Query(sql, [postId]));
    let updatedPost = results[0];

    // Return the updated post data
    return RespData(res, updatedPost);
}

module.exports = {
    CreatePost,
    GetPosts,
    LikePost,
    UnlikePost,
};