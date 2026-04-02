<template>
  <span v-if="!editing">{{ content }}</span>
  <input
    v-else-if="rows === undefined || rows === 1"
    v-model="content"
    type="text"
    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
    placeholder="Enter note title"
  />
  <textarea
    v-else
    v-model="content"
    rows="3"
    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
    placeholder="Enter note content"
  />
</template>

<script setup lang="ts">
defineProps<{
  editing?: boolean;
  rows?: number;
}>();

const content = defineModel<string | undefined>({
  required: true,
});
</script>
