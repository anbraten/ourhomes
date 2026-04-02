<template>
  <div class="space-y-3">
    <component :is="getCardComponent(item.type)" :item="item" :editing="editing" @click="editing = true" />

    <div class="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
      <div v-if="author" class="flex items-center">
        <img :src="author.avatar" :alt="author.name" class="w-4 h-4 rounded-full mr-1" />
        <span>{{ author.name }}</span>
      </div>
      <span>{{ formatTime(item.createdAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExpenseCard from '~/components/cards/ExpenseCard.vue';
import NoteCard from '~/components/cards/NoteCard.vue';
import ListCard from '~/components/cards/ListCard.vue';

const item = defineModel<FeedItem>('item', {
  required: true,
});

const { getMember } = await useHome();

const editing = ref(false);

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

const author = computed(() => getMember(item.value.author));
</script>
