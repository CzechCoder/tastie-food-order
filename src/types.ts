export interface CartProps {
  onClose: () => void;
}

export interface CheckoutProps {
  onCancel: () => void;
  onConfirm: ({}: User) => void;
}

export interface CartItemProps {
  amount: number;
  name: string;
  price: number;
  id: string;
  onAdd: () => void;
  onRemove: () => void;
}

export interface ShowCart {
  showCart: () => void;
}

export interface HideCart {
  showCart: () => void;
}

export interface MealItemFormProps {
  onAddToCart: (amount: number) => void;
  id: string;
}

export interface OrdersProps {
  user: User;
  orderedItems: OrderedItems[];
}

export type User = {
  city: string;
  name: string;
  postalCode: string;
  street: string;
};

export type OrderedItems = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

export type ItemProps = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

export type ChildrenProps = {
  children: JSX.Element;
};

export interface MealItemProps {
  description: string;
  id: string;
  name: string;
  price: number;
}

export interface InputProps {
  label: string;
  input: Input;
}

export type Input = {
  defaultValue: string;
  id: string;
  max: string;
  min: string;
  step: string;
  type: string;
};

export interface ReducerActionsProps {
  type: string;
  item?: ItemProps;
  id?: string;
}

export interface StateProps {
  items: any[];
  totalAmount: number;
}

export interface ModalProps extends CartProps {
  children: React.ReactFragment;
}

export interface ModalOverlayProps {
  children: React.ReactFragment;
}
