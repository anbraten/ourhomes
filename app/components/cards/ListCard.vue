<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
        :class="item.data.listType === 'todo' ? 'bg-secondary-100' : 'bg-accent-100'"
      >
        <component
          :is="category?.icon"
          class="w-5 h-5"
          :class="item.data.listType === 'todo' ? 'text-secondary-600' : 'text-accent-600'"
        />
      </div>
      <div>
        <h3 class="font-semibold text-gray-900"><Text v-model="item.data.name" :editing="editing" /></h3>
        <p class="text-sm text-gray-600 capitalize">{{ item.data.listType }} list</p>
      </div>
    </div>
    <div class="text-right">
      <p class="text-sm font-medium text-gray-900">{{ completedCount }}/{{ totalCount }}</p>
      <p class="text-xs text-gray-600">completed</p>
    </div>
  </div>

  <div class="space-y-2">
    <ul>
      <li
        v-for="listItem in item.data.items.slice(0, 3)"
        :key="listItem.id"
        class="flex items-center"
        :class="{
          'cursor-pointer': editing,
        }"
        @click="
          () => {
            if (editing) {
              listItem.completed = !listItem.completed;
            }
          }
        "
      >
        <div
          class="w-4 h-4 rounded-sm border-2 mr-3 flex items-center justify-center transition-colors duration-200"
          :class="{
            'bg-secondary-500 border-secondary-500': listItem.completed,
            'border-gray-300': !listItem.completed,
          }"
        >
          <CheckIcon v-if="listItem.completed" class="w-3 h-3 text-white" />
        </div>
        <span
          class="text-sm transition-colors duration-200"
          :class="listItem.completed ? 'text-gray-500 line-through' : 'text-gray-900'"
        >
          {{ listItem.text }}
        </span>
      </li>
    </ul>

    <p v-if="item.data.items.length > 3" class="text-xs text-gray-500 ml-7">
      +{{ item.data.items.length - 3 }} more items
    </p>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, ShoppingCartIcon, CheckIcon } from '@heroicons/vue/24/outline';
import Text from '~/components/form/Text.vue';

const item = defineModel<FeedItem<ListData>>('item', {
  required: true,
});

defineProps<{
  editing?: boolean;
}>();

const categories = [
  {
    name: 'todo',
    icon: CheckCircleIcon,
  },
  {
    name: 'shopping',
    icon: ShoppingCartIcon,
  },
];

const category = computed(() => categories.find((cat) => cat.name === item.value.data.listType));

const completedCount = computed(() => item.value.data.items.filter((item) => item.completed).length);

const totalCount = computed(() => item.value.data.items.length);

const { getMember } = await useHome();
const author = computed(() => getMember(item.value.author));
</script>
