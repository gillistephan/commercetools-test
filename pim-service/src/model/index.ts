import { Type, type Static } from '@sinclair/typebox';

export const LocalizedString = Type.Record(Type.String(), Type.String());

export const Category = Type.Object({
  id: Type.String(),
  slug: Type.String(),
  name: Type.String(),
  description: Type.Optional(Type.String()),
});

export type Category = Static<typeof Category>;

export const ProductImage = Type.Object({
  url: Type.String(),
  alt: Type.String(),
  isMain: Type.Optional(Type.Boolean()),
  width: Type.Optional(Type.Number()),
  height: Type.Optional(Type.Number()),
});

export type ProductImage = Static<typeof ProductImage>;

export const PremiumKind = Type.Union([
  Type.Literal('digital'),
  Type.Literal('physical'),
]);

export type PremiumKind = Static<typeof PremiumKind>;

const BaseProduct = Type.Object({
  id: Type.String(),
  slug: Type.String(),
  name: LocalizedString,
  description: LocalizedString,
  images: Type.Array(ProductImage),
});

export const PremiumProduct = Type.Intersect([
  BaseProduct,
  Type.Object({
    tag: Type.Literal('premium'),
    kind: PremiumKind,
    brand: Type.String(),
    price: Type.Number(),
    allowsAdditionalPayment: Type.Boolean(),
    loyaltyPoints: Type.Number(),
    minLoyaltyPoints: Type.Number(),
    factor: Type.Number(),
  }),
]);

export type PremiumProduct = Static<typeof PremiumProduct>;

export const DiscountKind = Type.Union([
  Type.Literal('percentage'),
  Type.Literal('absolute'),
]);

export type DiscountKind = Static<typeof DiscountKind>;

export const VoucherProduct = Type.Intersect([
  BaseProduct,
  Type.Object({
    tag: Type.Literal('voucher'),
    nominalValue: Type.Number(),
    discount: Type.Number(),
    kind: DiscountKind,
    validityPeriod: Type.Optional(Type.Tuple([Type.Date(), Type.Date()])),
  }),
]);

export type VoucherProduct = Static<typeof VoucherProduct>;

export const AffiliateKind = Type.Union([
  Type.Literal('Link'),
  Type.Literal('LinkWithCode'),
]);

export const AffiliateProduct = Type.Intersect([
  BaseProduct,
  Type.Object({
    tag: Type.Literal('affiliate'),
    kind: AffiliateKind,
    discount: Type.Number(),
    discountKind: DiscountKind,
    validityPeriod: Type.Optional(Type.Tuple([Type.Date(), Type.Date()])),
    url: Type.String(),
  }),
]);

export const Product = Type.Union([
  PremiumProduct,
  VoucherProduct,
  AffiliateProduct,
]);

export type Product = Static<typeof Product>;

export const Catalog = Type.Object({
  tenant: Type.String(),
  categories: Type.Array(Category),
  products: Type.Array(Product),
});

export type Catalog = Static<typeof Catalog>;
