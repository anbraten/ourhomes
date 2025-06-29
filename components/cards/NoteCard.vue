<template>
  <div class="space-y-3">
    <div class="flex items-start">
      <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
        <ChatBubbleLeftIcon class="w-5 h-5 text-primary-600" />
      </div>
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900 mb-2">{{ item.data.title }}</h3>
        <p class="text-gray-700 leading-relaxed">{{ item.data.content }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
      <div class="flex items-center">
        <img :src="item.author.avatar" :alt="item.author.name" class="w-4 h-4 rounded-full mr-1" />
        <span>{{ item.author.name }}</span>
      </div>
      <span>{{ formatTime(item.createdAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  item: Object,
});

const formatTime = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>
