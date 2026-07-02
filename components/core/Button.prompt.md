Brand button for Interliving Rehmann — use `primary` (red) for the one key action per view, `secondary` (navy) for supporting actions.

```jsx
<Button variant="primary" size="lg">Jetzt Termin sichern</Button>
<Button variant="secondary">Mehr erfahren</Button>
<Button variant="outline" iconLeft={<Icon name="phone" />}>Anrufen</Button>
<Button variant="ghost" size="sm">Abbrechen</Button>
```

Variants: `primary` | `secondary` | `outline` | `ghost`. Sizes: `sm` | `md` | `lg`. Props: `block`, `disabled`, `iconLeft`, `iconRight`. Hover darkens + lifts 1px; never scales down. Red `primary` carries the brand-tinted shadow — use sparingly.
