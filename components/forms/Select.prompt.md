Styled native select with a custom chevron and red focus ring.

```jsx
<Select label="Anliegen" options={["Küchenplanung", "Wohnen", "Schlafen", "Garten"]} />
<Select label="Filiale" options={[{value:"velbert", label:"Velbert"}]} hint="Wählen Sie Ihren Standort." />
```

Pass `options` (strings or `{value,label}`) or `<option>` children.
