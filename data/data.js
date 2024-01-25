const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Ugnius",
        email: "Ugnius@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jenny Doe",
        email: "Jenny@example.com",
      },
      {
        name: "Ugnius",
        email: "Ugnius@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Jenny Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        email: "anthony@example.com",
      },
      {
        name: "Ugnius",
        email: "Ugnius@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Anthony",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "John@example.com",
      },
      {
        name: "Ugnius",
        email: "Ugnius@example.com",
      },
      {
        name: "Jenny Doe",
        email: "Jenny@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Group Chat 1",
    groupAdmin: {
      name: "Jenny Doe",
      email: "Jenny@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "Jane@example.com",
      },
      {
        name: "Ugnius",
        email: "Ugnius@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "John@example.com",
      },
      {
        name: "Ugnius",
        email: "Ugnius@example.com",
      },
      {
        name: "Jenny Doe",
        email: "Jenny@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Group Chat 2",
    groupAdmin: {
      name: "Jenny Doe",
      email: "Jenny@example.com",
    },
  },
];

module.exports = { chats };
