<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <div class="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center mr-3">
        <CurrencyDollarIcon class="w-5 h-5 text-accent-600" />
      </div>
      <div>
        <h3 class="font-semibold text-gray-900"><Text v-model="item.data.name" :editing="editing" /></h3>
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
</template>

<script setup lang="ts">
import { CurrencyDollarIcon } from '@heroicons/vue/24/outline';
import Text from '~/components/form/Text.vue';

const item = defineModel<FeedItem<ExpenseData>>('item', {
  required: true,
});

defineProps<{
  compact?: boolean;
  editing?: boolean;
}>();

const { getMember } = await useHome();

const paidBy = computed(() => getMember(item.value.data.paidBy));
const participants = computed(() => item.value.data.participants.map((id) => getMember(id)));
</script>
