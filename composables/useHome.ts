export async function useHome() {
  const route = useRoute();
  const homeId = computed(() => route.params.homeId as string);
  const { data: currentHome, execute: fetchCurrentHome } = useFetch(() => `/api/homes/${homeId.value}`, {
    key: () => `GET /api/homes/${homeId.value}`,
    immediate: false,
    watch: false,
  });

  const { data: members, execute: fetchMembers } = useFetch(() => `/api/homes/${homeId.value}/members`, {
    key: () => `GET /api/homes/${homeId.value}/members`,
    default: () => [],
    immediate: false,
    watch: false,
  });

  watch(
    homeId,
    (newHomeId) => {
      if (newHomeId) {
        fetchCurrentHome();
        fetchMembers();
      }
    },
    { immediate: true },
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
