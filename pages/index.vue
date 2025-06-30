<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome to Ourhome</h1>
        <p class="text-gray-600">Select your home to get started</p>
      </div>

      <div class="space-y-4">
        <NuxtLink
          v-for="home in homesWithMembers"
          :key="home.id"
          :to="`/homes/${home.id}`"
          class="block card cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-900">{{ home.name }}</h3>
              <p class="text-sm text-gray-600">{{ home.members.length }} members</p>
            </div>
            <div class="flex -space-x-2">
              <img
                v-for="member in home.members.slice(0, 3)"
                :key="member.id"
                :src="member.avatar"
                :alt="member.name"
                class="w-8 h-8 rounded-full border-2 border-white"
              />
              <div
                v-if="home.members.length > 3"
                class="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600"
              >
                +{{ home.members.length - 3 }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-8 text-center">
        <button class="btn btn-primary w-full">Create home</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: homes } = await useFetch('/api/homes', {
  default: () => [],
});

const homesWithMembers = computed(() => {
  return homes.value.map((home: any) => ({
    ...home,
    members: [], // TODO: add members
  }));
});

// Redirect if already has a home selected
onMounted(() => {
  // const { currentHome } = useHome()
  // if (currentHome.value) {
  //   navigateTo('/feed')
  // }
});
</script>
