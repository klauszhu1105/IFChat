<template>
    <div class="message">
      <p class="message-content">{{ message.content }}</p>
      <span class="message-timestamp">{{ message.timestamp }}</span>
    </div>
  </template>
  
  <style scoped>
  .message {
    /* Styles for the individual message container */
    display: flex;
    align-items: flex-start;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .message-content {
    /* Styles for the message content */
    flex-grow: 1;
    margin-right: 10px;
  }
  
  .message-timestamp {
    /* Styles for the message timestamp */
    font-style: italic;
    color: #888;
  }
  </style>