<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ currentHome?.name }}</h1>
        <p class="text-gray-600">{{ feedItems.length }} updates</p>
      </div>
      <button class="btn btn-primary" @click="showAdd = !showAdd">
        <PlusIcon class="w-5 h-5 mr-2" />
        Add
      </button>

      <teleport to="body">
        <div v-if="showAdd" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-10">
          <div class="flex items-center justify-center min-h-screen">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 class="text-xl font-semibold mb-4">Add New Item</h2>
              <p class="text-gray-600 mb-4">Select the type of item you want to add:</p>
              <div class="space-y-3">
                <button class="btn btn-secondary w-full" @click="showAdd = false">
                  <CurrencyDollarIcon class="w-5 h-5 text-accent-600" />
                  <span>Expense</span>
                </button>
                <button class="btn btn-secondary w-full" @click="showAdd = false">
                  <CurrencyDollarIcon class="w-5 h-5 text-accent-600" />
                  <span>Note</span>
                </button>
                <button class="btn btn-secondary w-full" @click="showAdd = false">
                  <CurrencyDollarIcon class="w-5 h-5 text-accent-600" />
                  <span>List</span>
                </button>
              </div>
              <button class="btn border mt-4 w-full" @click="showAdd = false">Cancel</button>
            </div>
          </div>
        </div>
      </teleport>
    </div>

    <div class="space-y-4">
      <div v-for="item in feedItems" :key="item.id" class="card">
        <Card :item="item" />
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
import { PlusIcon, ChatBubbleLeftIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';
import Card from '~/components/cards/Card.vue';

const { currentHome } = await useHome();

const showAdd = ref(false);

const { data: feedItems } = await useFetch(() => `/api/homes/${currentHome.value?.id}/feed`, {
  default: () => [],
});
</script>
