<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Expenses Overview</h1>
      <p class="text-gray-600">Your current balance and recent expenses</p>
    </div>

    <!-- Balance Summary -->
    <div class="card mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Balance</h2>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img :src="currentUser?.avatar" :alt="currentUser?.name" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <p class="font-medium text-gray-900">{{ currentUser?.name }}</p>
            <p class="text-sm text-gray-600">Current balance</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold" :class="currentUserBalance >= 0 ? 'text-secondary-600' : 'text-red-600'">
            {{ currentUserBalance >= 0 ? '+' : '' }}${{ Math.abs(currentUserBalance).toFixed(2) }}
          </p>
          <p class="text-sm text-gray-600">
            {{ currentUserBalance >= 0 ? 'You are owed' : 'You owe' }}
          </p>
        </div>
      </div>
    </div>

    <!-- All Balances -->
    <div class="card mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">All Balances</h2>
      <div class="space-y-3">
        <div
          v-for="(member, userId) in membersWithBalances"
          :key="userId"
          class="flex items-center justify-between py-2"
        >
          <div class="flex items-center">
            <img :src="member.avatar" :alt="member.name" class="w-8 h-8 rounded-full mr-3" />
            <span class="font-medium text-gray-900">{{ member.name }}</span>
          </div>
          <span class="font-semibold" :class="member.balance >= 0 ? 'text-secondary-600' : 'text-red-600'">
            {{ member.balance >= 0 ? '+' : '' }}${{ Math.abs(member.balance).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Recent Expenses -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h2>
      <div class="space-y-4">
        <div v-for="expense in recentExpenses" :key="expense.id" class="border-l-4 border-primary-500 pl-4">
          <ExpenseCard :item="expense" :compact="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExpenseCard from '~/components/cards/ExpenseCard.vue';

const { currentUser, members, currentHome } = await useHome();

const { data: expenses } = await useFetch<FeedItem<ExpenseData>[]>(() => `/api/homes/${currentHome.value?.id}/feed`, {
  query: { type: 'expense' },
  default: () => [],
});

const recentExpenses = expenses.value
  .toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 5);

type Member = (typeof members.value)[0];

const membersWithBalances = computed(() => {
  const balances: Record<number, Member & { balance: number }> = {};

  // Initialize balances
  members.value.forEach((user) => {
    balances[user.id] = {
      ...user,
      balance: 0,
    };
  });

  expenses.value.forEach((expense) => {
    const expenseData = expense.data as ExpenseData;
    const amountPerPerson = expenseData.amount / expenseData.participants.length;

    expenseData.participants.forEach((participantId) => {
      if (participantId === expenseData.paidBy) {
        balances[participantId].balance += expenseData.amount - amountPerPerson;
      } else {
        balances[participantId].balance -= amountPerPerson;
      }
    });
  });

  return balances;
});

const currentUserBalance = currentUser.value ? membersWithBalances.value[currentUser.value?.id]?.balance : 0;
</script>
