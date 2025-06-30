<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center mr-3">
          <CurrencyDollarIcon class="w-5 h-5 text-accent-600" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">{{ item.data.name }}</h3>
          <p class="text-sm text-gray-600">{{ item.data.category }}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-gray-900">${{ item.data.amount.toFixed(2) }}</p>
        <p class="text-sm text-gray-600">
          ${{ (item.data.amount / item.data.participants.length).toFixed(2) }} per person
        </p>
      </div>
    </div>

    <div v-if="!compact" class="space-y-2">
      <div v-if="paidBy" class="flex items-center justify-between text-sm">
        <span class="text-gray-600">Paid by:</span>
        <div class="flex items-center">
          <img :src="paidBy.avatar" :alt="paidBy.name" class="w-6 h-6 rounded-full mr-2" />
          <span class="font-medium text-gray-900">{{ paidBy.name }}</span>
        </div>
      </div>

      <div class="text-sm">
        <span class="text-gray-600">Participants:</span>
        <div class="flex -space-x-1 mt-1">
          <div v-for="(participant, i) in participants" :key="participant?.id ?? i">
            <img
              v-if="participant"
              :src="participant.avatar"
              :alt="participant.name"
              class="w-6 h-6 rounded-full border-2 border-white"
              :title="participant.name"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="!compact" class="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
      <div v-if="author" class="flex items-center">
        <img :src="author.avatar" :alt="author.name" class="w-4 h-4 rounded-full mr-1" />
        <span>{{ author.name }}</span>
      </div>
      <span>{{ formatTime(item.createdAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CurrencyDollarIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  item: FeedItem<ExpenseData>;
  compact?: boolean;
}>();

const { getMembers } = await useHome();
const members = await getMembers();

function getMember(id: number) {
  return members.value?.find((member) => member.id === id);
}

const author = computed(() => getMember(props.item.author));
const paidBy = computed(() => getMember(props.item.data.paidBy));
const participants = computed(() => props.item.data.participants.map((id) => getMember(id)));

function formatTime(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>
