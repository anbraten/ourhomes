export async function useHome() {
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const homeId = computed(() => route.params.homeId as string);
  const { data: currentHome } = await nuxtApp.runWithContext(
    async () =>
      await useFetch(() => `/api/homes/${homeId.value}`, {
        key: () => `GET /api/homes/${homeId.value}`,
      }),
  );

  const { data: members } = await nuxtApp.runWithContext(
    async () =>
      await useFetch(() => `/api/homes/${homeId.value}/members`, {
        key: () => `GET /api/homes/${homeId.value}/members`,
        default: () => [],
      }),
  );

  function getMember(_id: string | number) {
    const id = typeof _id === 'string' ? Number(_id) : _id;
    return members.value.find((member) => member.id === id);
  }

  return {
    currentUser: readonly(computed(() => members.value.at(0))),
    members,
    getMember,
    currentHome,
  };
}
