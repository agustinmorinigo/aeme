# DatePicker

Componente para selección de fechas basado en `react-day-picker` y `date-fns`.

## Componentes

### DatePicker

Selector de fecha simple.

```tsx
import { DatePicker } from '@aeme/ui';

function Example() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Seleccionar fecha"
    />
  );
}
```

### DateRangePicker

Selector de rango de fechas.

```tsx
import { DateRangePicker } from '@aeme/ui';

function Example() {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>();

  return (
    <DateRangePicker
      value={range}
      onChange={setRange}
      placeholder="Seleccionar rango de fechas"
    />
  );
}
```

## Props

Ambos componentes aceptan todas las props del componente `Calendar` de `react-day-picker`, excepto `mode`, `selected`, y `onSelect`.

### Props adicionales

- `value`: Fecha o rango de fechas seleccionado
- `onChange`: Callback cuando cambia la selección
- `placeholder`: Texto placeholder cuando no hay valor seleccionado
- `className`: Clase CSS adicional para el botón trigger
- `disabled`: Puede ser:
  - `boolean`: Deshabilita completamente el componente
  - `(date: Date) => boolean`: Función para deshabilitar fechas específicas

## Ejemplos

### Deshabilitar fechas pasadas

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  disabled={(date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }}
/>
```

### Rango de fechas con 2 meses

```tsx
<DateRangePicker
  value={range}
  onChange={setRange}
  numberOfMonths={2}
/>
```
