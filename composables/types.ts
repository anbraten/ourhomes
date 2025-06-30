export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface home {
  id: number;
  name: string;
  members: User[];
  createdAt: Date;
}

export interface FeedItem<D = unknown> {
  id: number;
  type: 'note' | 'expense' | 'list';
  author: number;
  homeId: number;
  createdAt: Date;
  data: D;
}

export interface ExpenseData {
  name: string;
  amount: number;
  paidBy: number;
  participants: number[];
  category: string;
}

export interface ListData {
  name: string;
  items: { id: string; text: string; completed: boolean }[];
  listType: 'todo' | 'shopping';
}

export interface NoteData {
  title: string;
  content: string;
}
