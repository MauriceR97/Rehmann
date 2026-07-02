The storefront product tile — photo, navy title, red price, promo badge, merkliste heart and add-to-cart.

```jsx
<ProductCard
  image="/sofa.jpg"
  brand="Interliving"
  title="Eckkombination Vienna"
  subtitle="Bezug Stoff Impression grün-grau, Metallkufe Nickel satiniert"
  price={2499}
  was={3299}
  badge="−30%"
  onAdd={() => addToCart()}
/>
```

Composes Badge + PriceTag + IconButton. Hover lifts the card and gently zooms the photo. Heart toggles saved state. Omit `image` for a labelled placeholder.
