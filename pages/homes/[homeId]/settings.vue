<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p class="text-gray-600">Manage your home and members</p>
    </div>

    <!-- home Information -->
    <div class="card mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">home Information</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">home Name</label>
          <input
            v-model="homeName"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Created</label>
          <p class="text-gray-600">{{ formatDate(currentHome?.createdAt) }}</p>
        </div>
      </div>
    </div>

    <!-- Members -->
    <div class="card mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Members</h2>
        <button class="btn btn-primary">
          <PlusIcon class="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="member in members"
          :key="member.id"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center">
            <img :src="member.avatar" :alt="member.name" class="w-10 h-10 rounded-full mr-3" />
            <div>
              <p class="font-medium text-gray-900">{{ member.name }}</p>
              <p class="text-sm text-gray-600">{{ member.email }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <span
              v-if="member.id === currentUser?.id"
              class="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full"
            >
              You
            </span>
            <button v-else class="text-red-600 hover:text-red-800 transition-colors duration-200">
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
      <div class="space-y-3">
        <button class="btn btn-secondary w-full justify-start text-red-600 hover:bg-red-50">
          <TrashIcon class="w-4 h-4 mr-2" />
          Leave home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, TrashIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';

const { currentHome, currentUser, members } = await useHome();

const homeName = ref(currentHome.value?.name || '');
</script>
