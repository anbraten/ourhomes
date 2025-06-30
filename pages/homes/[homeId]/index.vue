<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ currentHome?.name }}</h1>
        <p class="text-gray-600">{{ feedItems.length }} updates</p>
      </div>
      <button class="btn btn-primary">
        <PlusIcon class="w-5 h-5 mr-2" />
        Add
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="item in feedItems" :key="item.id" class="card">
        <component :is="getCardComponent(item.type)" :item="item" />
      </div>
    </div>

    <div v-if="feedItems.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <ChatBubbleLeftIcon class="w-12 h-12 mx-auto" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No updates yet</h3>
      <p class="text-gray-600">Be the first to add something to your home's feed!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';
import ExpenseCard from '~/components/cards/ExpenseCard.vue';
import NoteCard from '~/components/cards/NoteCard.vue';
import ListCard from '~/components/cards/ListCard.vue';

const { currentHome } = await useHome();

const { data: feedItems } = await useFetch(() => `/api/homes/${currentHome.value?.id}/feed`, {
  default: () => [],
});

// const feedItems = getFeedItems().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const getCardComponent = (type: FeedItem['type']) => {
  switch (type) {
    case 'expense':
      return ExpenseCard;
    case 'note':
      return NoteCard;
    case 'list':
      return ListCard;
    default:
      return 'div';
  }
};
</script>
