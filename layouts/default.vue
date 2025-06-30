<template>
  <div class="min-h-screen bg-gray-50">
    <div class="pb-20 md:pb-0 mt-20">
      <slot />
    </div>

    <!-- Mobile Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div v-if="currentHome" class="flex justify-around py-2">
        <NuxtLink
          :to="`/homes/${currentHome.id}`"
          class="flex flex-col items-center py-2 px-3 text-xs transition-colors duration-200"
          :class="$route.path === `/homes/${currentHome.id}` ? 'text-primary-600' : 'text-gray-600'"
        >
          <HomeIcon class="w-6 h-6 mb-1" />
          <span>Feed</span>
        </NuxtLink>

        <NuxtLink
          :to="`/homes/${currentHome.id}/expenses`"
          class="flex flex-col items-center py-2 px-3 text-xs transition-colors duration-200"
          :class="$route.path === `/homes/${currentHome.id}/expenses` ? 'text-primary-600' : 'text-gray-600'"
        >
          <CurrencyDollarIcon class="w-6 h-6 mb-1" />
          <span>Expenses</span>
        </NuxtLink>

        <NuxtLink
          :to="`/homes/${currentHome.id}/settings`"
          class="flex flex-col items-center py-2 px-3 text-xs transition-colors duration-200"
          :class="$route.path === `/homes/${currentHome.id}/settings` ? 'text-primary-600' : 'text-gray-600'"
        >
          <CogIcon class="w-6 h-6 mb-1" />
          <span>Settings</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Desktop Navigation -->
    <nav class="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-900 hover:text-primary-600 transition-colors duration-200">
              <h1 class="text-xl font-bold text-gray-900">Ourhome</h1>
            </NuxtLink>
            <div v-if="currentHome" class="flex space-x-4">
              <NuxtLink
                :to="`/homes/${currentHome.id}`"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                :class="
                  $route.path === `/homes/${currentHome.id}`
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                "
              >
                Feed
              </NuxtLink>
              <NuxtLink
                :to="`/homes/${currentHome.id}/expenses`"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                :class="
                  $route.path === `/homes/${currentHome.id}/expenses`
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                "
              >
                Expenses
              </NuxtLink>
              <NuxtLink
                :to="`/homes/${currentHome.id}/settings`"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                :class="
                  $route.path === `/homes/${currentHome.id}/settings`
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                "
              >
                Settings
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center space-x-4" v-if="currentHome">
            <span class="text-sm text-gray-600">{{ currentHome.name }}</span>
            <div class="flex -space-x-2">
              <img
                v-for="member in members?.slice(0, 3)"
                :key="member.id"
                :src="member.avatar"
                :alt="member.name"
                class="w-8 h-8 rounded-full border-2 border-white"
              />
              <div
                v-if="members.length > 3"
                class="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600"
              >
                +{{ members.length - 3 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="hidden md:block h-16"></div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, CurrencyDollarIcon, CogIcon } from '@heroicons/vue/24/outline';

const { currentHome, getMembers } = await useHome();

const members = await getMembers();
</script>
