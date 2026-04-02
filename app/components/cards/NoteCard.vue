<template>
  <div class="flex items-start">
    <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
      <ChatBubbleLeftIcon class="w-5 h-5 text-primary-600" />
    </div>
    <div class="flex-1">
      <h3 class="font-semibold text-gray-900 mb-2">
        <Text v-model="item.data.title" :editing="editing" />
      </h3>
      <p class="text-gray-700 leading-relaxed">
        <Text v-model="item.data.content" :editing="editing" :rows="5" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';
import Text from '~/components/form/Text.vue';

const item = defineModel<FeedItem<NoteData>>('item', {
  required: true,
});

defineProps<{
  editing?: boolean;
}>();
</script>
