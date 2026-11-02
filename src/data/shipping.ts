export interface ShippingMethod {
  id: string;
  label: string;
  description: string;
  cost: number;
}

// PLACEHOLDER RATES: the checkout API accepts shipping_method and shipping_cost from
// the storefront but does not publish them. Replace these with Mithayi's real options.
export const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    label: "Standard delivery",
    description: "1 to 3 working days",
    cost: 300,
  },
  {
    id: "express",
    label: "Express delivery",
    description: "Next working day",
    cost: 600,
  },
];
