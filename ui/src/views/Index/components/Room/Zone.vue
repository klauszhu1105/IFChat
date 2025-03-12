<template>
  <div class="zone">
    <div class="post">
      <textarea v-model="newPost" placeholder="写点什么吧..."></textarea>
      <button @click="publishPost">发布</button>
    </div>

    <div class="posts">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-header">
          <span class="username">{{ post.username}}</span>
          <span class="post-date">{{ formatDate(post.publish_time) }}</span>
        </div>
        <div class="post-content">{{ post.content }}</div>
        <div class="post-actions">
          <button @click="likePost(post.id)">点赞 ({{ post.likes }})</button>
        </div>
      </div>
    </div>
    <div class="back-to-home">
      <button @click="navigateToHome()">返回首页</button>
    </div>
  </div>
</template>

<script>
import { createPost, getPosts, likePost } from '@/api/post'; // Import encapsulated methods

export default {
  data() {
    return {
      newPost: '',
      posts: [], // From backend
    };
  },
  methods: {
    async publishPost() {
      const publishTime = new Date().toISOString();
      const username = this.$store.getters.userInfo.username; // Assuming current user's username
      const content = this.newPost;
      try {
        await createPost({ content, username, publishTime });
        await this.getPosts();
        this.newPost = '';
      } catch (error) {
        console.error('Publish post failed:', error);
      }
    },
    async likePost(postId) {
      try {
        await likePost(postId);
        await this.getPosts();
      } catch (error) {
        console.error('Like post failed:', error);
      }
    },
    async getPosts() {
      try {
        const response = await getPosts();
        this.posts = response.data;
      } catch (error) {
        console.error('Get posts failed:', error);
      }
    },
    formatDate(timestamp) {
      // Format date, you can use a date library like moment.js
      // Example: Convert timestamp to readable date string
      const date = new Date(timestamp);
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        return '刚刚';
      } else if (minutes < 60) {
        return `${minutes} 分钟前`;
      } else if (hours < 24) {
        return `${hours} 小时前`;
      } else {
        return `<span class="math-inline">\{date\.getFullYear\(\)\}\-</span>{date.getMonth() + 1}-${date.getDate()}`;
      }
    },
    navigateToHome() {
      // Assuming you're using Vue Router
      this.$router.push('/');
    },
  },
  created() {
    this.getPosts(); // Fetch posts on initialization
  },
};
</script>
  
<style scoped>

.zone {
  margin-top: 0px;
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.post-header span {
  margin-right: 10px; /* Add right margin to each span */
}

.post {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.post textarea {
  width: calc(90%);
  height: 70px;
  resize: none;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.post button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
}

.post-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;
}

.username {
  font-weight: bold;
}

.post-date {
  color: #888;
}

.post-content {
  margin-top: 10px;
}

.post-actions {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
}

.post-actions button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.back-to-home {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.back-to-home button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}
</style>