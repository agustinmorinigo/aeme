import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

export default function setupDateFns() {
  setDefaultOptions({ locale: es });
}
