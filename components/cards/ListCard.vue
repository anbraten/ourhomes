<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          :class="item.data.listType === 'todo' ? 'bg-secondary-100' : 'bg-accent-100'"
        >
          <component
            :is="item.data.listType === 'todo' ? CheckCircleIcon : ShoppingCartIcon"
            class="w-5 h-5"
            :class="item.data.listType === 'todo' ? 'text-secondary-600' : 'text-accent-600'"
          />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">{{ item.data.name }}</h3>
          <p class="text-sm text-gray-600 capitalize">{{ item.data.listType }} list</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm font-medium text-gray-900">{{ completedCount }}/{{ totalCount }}</p>
        <p class="text-xs text-gray-600">completed</p>
      </div>
    </div>

    <div class="space-y-2">
      <div v-for="listItem in item.data.items.slice(0, 3)" :key="listItem.id" class="flex items-center">
        <div
          class="w-4 h-4 rounded-sm border-2 mr-3 flex items-center justify-center transition-colors duration-200"
          :class="listItem.completed ? 'bg-secondary-500 border-secondary-500' : 'border-gray-300'"
        >
          <CheckIcon v-if="listItem.completed" class="w-3 h-3 text-white" />
        </div>
        <span
          class="text-sm transition-colors duration-200"
          :class="listItem.completed ? 'text-gray-500 line-through' : 'text-gray-900'"
        >
          {{ listItem.text }}
        </span>
      </div>

      <p v-if="item.data.items.length > 3" class="text-xs text-gray-500 ml-7">
        +{{ item.data.items.length - 3 }} more items
      </p>
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
import { CheckCircleIcon, ShoppingCartIcon, CheckIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  item: Object,
});

const completedCount = computed(() => {
  return props.item.data.items.filter((item) => item.completed).length;
});

const totalCount = computed(() => {
  return props.item.data.items.length;
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
