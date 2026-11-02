export interface ShippingMethod {
  /** Sent to the checkout API as shipping_method */
  id: string;
  label: string;
  description: string;
  /** Sent to the checkout API as shipping_cost */
  cost: number;
}

export const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    label: "Standard delivery",
    description: "Delivered to your address",
    cost: 350,
  },
];
