export async function useHome() {
  const route = useRoute();
  const homeId = computed(() => route.params.homeId);
  const { data: currentHome } = await useFetch(() => `/api/homes/${homeId.value}`);

  const { data: members } = await useFetch(() => `/api/homes/${homeId.value}/members`, {
    default: () => [],
  });

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
