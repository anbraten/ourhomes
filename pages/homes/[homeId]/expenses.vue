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
        <div v-for="(balance, userId) in balances" :key="userId" class="flex items-center justify-between py-2">
          <div class="flex items-center">
            <img
              :src="getUserById(userId)?.avatar"
              :alt="getUserById(userId)?.name"
              class="w-8 h-8 rounded-full mr-3"
            />
            <span class="font-medium text-gray-900">{{ getUserById(userId)?.name }}</span>
          </div>
          <span class="font-semibold" :class="balance >= 0 ? 'text-secondary-600' : 'text-red-600'">
            {{ balance >= 0 ? '+' : '' }}${{ Math.abs(balance).toFixed(2) }}
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

const { currentUser, getUsers } = useHome();

const users = getUsers();
const balances = calculateExpenseBalances();
const currentUserBalance = balances[currentUser.value.id] || 0;

const recentExpenses = getFeedItems()
  .filter((item) => item.type === 'expense')
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 5);

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function calculateExpenseBalances() {
  const expenses = mockFeedItems.filter((item) => item.type === 'expense');
  const balances: Record<string, number> = {};

  // Initialize balances
  mockUsers.forEach((user) => {
    balances[user.id] = 0;
  });

  expenses.forEach((expense) => {
    const expenseData = expense.data as ExpenseData;
    const amountPerPerson = expenseData.amount / expenseData.participants.length;

    expenseData.participants.forEach((participantId) => {
      if (participantId === expenseData.paidBy) {
        balances[participantId] += expenseData.amount - amountPerPerson;
      } else {
        balances[participantId] -= amountPerPerson;
      }
    });
  });

  return balances;
}
</script>
