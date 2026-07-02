Brand-red checkbox with a large, accessible hit area.

```jsx
<Checkbox label="Newsletter abonnieren" defaultChecked />
<Checkbox label="AGB akzeptieren" checked={ok} onChange={e => setOk(e.target.checked)} />
```

Controlled via `checked`/`onChange` or uncontrolled via `defaultChecked`.
