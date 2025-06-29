export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface home {
  id: string;
  name: string;
  members: User[];
  createdAt: Date;
}

export interface FeedItem {
  id: string;
  type: 'note' | 'expense' | 'list';
  author: User;
  createdAt: Date;
  data: any;
}

export interface ExpenseData {
  name: string;
  amount: number;
  paidBy: string;
  participants: string[];
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
