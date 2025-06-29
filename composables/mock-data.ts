export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Charlie',
    email: 'charlie@example.com',
    avatar:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Diana',
    email: 'diana@example.com',
    avatar:
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
];

// export const mockhomes: home[] = [
//   {
//     id: '1',
//     name: 'Sunset Apartment',
//     members: [mockUsers[0], mockUsers[1], mockUsers[2]],
//     createdAt: new Date('2024-01-15'),
//   },
//   {
//     id: '2',
//     name: 'Downtown Loft',
//     members: [mockUsers[0], mockUsers[3]],
//     createdAt: new Date('2024-02-10'),
//   },
// ];

// export const mockFeedItems: FeedItem[] = [
//   {
//     id: '1',
//     type: 'expense',
//     author: mockUsers[0],
//     createdAt: new Date('2024-12-10T14:00:00'),
//     data: {
//       name: 'Groceries',
//       amount: 45.5,
//       paidBy: '1',
//       participants: ['1', '2', '3'],
//       category: 'Food',
//     } as ExpenseData,
//   },
//   {
//     id: '2',
//     type: 'note',
//     author: mockUsers[1],
//     createdAt: new Date('2024-12-09T16:30:00'),
//     data: {
//       title: 'Maintenance Notice',
//       content: 'The washing machine will be serviced tomorrow from 10 AM to 2 PM. Please plan accordingly.',
//     } as NoteData,
//   },
//   {
//     id: '3',
//     type: 'list',
//     author: mockUsers[2],
//     createdAt: new Date('2024-12-08T12:00:00'),
//     data: {
//       name: 'Shopping List',
//       listType: 'shopping',
//       items: [
//         { id: '1', text: 'Milk', completed: false },
//         { id: '2', text: 'Bread', completed: true },
//         { id: '3', text: 'Eggs', completed: false },
//         { id: '4', text: 'Cheese', completed: false },
//       ],
//     } as ListData,
//   },
//   {
//     id: '4',
//     type: 'expense',
//     author: mockUsers[1],
//     createdAt: new Date('2024-12-07T19:15:00'),
//     data: {
//       name: 'Electricity Bill',
//       amount: 120.0,
//       paidBy: '2',
//       participants: ['1', '2', '3'],
//       category: 'Utilities',
//     } as ExpenseData,
//   },
//   {
//     id: '5',
//     type: 'list',
//     author: mockUsers[0],
//     createdAt: new Date('2024-12-06T09:00:00'),
//     data: {
//       name: 'Cleaning Tasks',
//       listType: 'todo',
//       items: [
//         { id: '1', text: 'Vacuum living room', completed: true },
//         { id: '2', text: 'Clean bathroom', completed: false },
//         { id: '3', text: 'Take out trash', completed: true },
//         { id: '4', text: 'Mop kitchen floor', completed: false },
//       ],
//     } as ListData,
//   },
// ];
