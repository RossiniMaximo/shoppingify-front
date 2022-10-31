export type ItemCardsProps = {
  name: string;
  category: string;
  key: number;
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
  key: number;
};

type ListItemCardType = {
    name: string;
    img?: string;
    description: string;
    key: number;
  };