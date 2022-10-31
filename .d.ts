export type ItemCardsProps = {
  name: string;
  category: string;
  key: string;
};

type ListCardProps = {
  date: string;
  title: string;
  completed: string;
  listId: number;
  removeItem: (any) => any;
};
type itemType = {
  category: string;
  name: string;
  createdAt: string;
  description: string;
  id: number;
  img: string;
  listItem: object;
  updatedAt: string;
  key: string;
};

type ListItemCardType = {
  name: string;
  img?: string;
  description: string;
  key: string;
};
