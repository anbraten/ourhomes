import { mockUsers } from './mock-data';

export const useHome = async () => {
  const route = useRoute();
  const homeId = computed(() => route.params.homeId);
  const { data: currentHome } = await useFetch(() => `/api/homes/${homeId.value}`);

  async function getMembers() {
    const { data: members } = await useFetch(() => `/api/homes/${homeId.value}/members`, {
      default: () => [],
    });
    return members;
  }

  return {
    currentUser: readonly(computed(() => mockUsers.at(0))),
    getMembers,
    currentHome,
  };
};
