import { mockUsers } from './mock-data';

export const useHome = async () => {
  const getUsers = () => mockUsers;

  const route = useRoute();
  const homeId = computed(() => route.params.homeId);
  const { data: currentHome } = await useFetch(() => `/api/homes/${homeId.value}`);

  return {
    currentUser: readonly(computed(() => mockUsers.at(0))),
    getUsers,
    currentHome,
  };
};
