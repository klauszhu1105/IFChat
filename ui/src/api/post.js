import request from '@/utils/request';

// Create a new post
export function createPost(post) {
  return request({
    url: '/post/create-post',
    method: 'post',
    data: post,
  });
}

// Retrieve all posts
export function getPosts(params) {
  return request({
    url: '/post/get-posts',
    method: 'get',
    params,
  });
}

// Like a post
export function likePost(postId) {
    return request({
      url: '/post/like-post', // Remove postId from URL
      method: 'post',
      data: { postId }, // Add postId to request body
    });
  }

// Unlike a post
export function unlikePost(postId) {
  return request({
    url: '/post/unlike-post',
    method: 'post',
    data: { postId },
  });
}