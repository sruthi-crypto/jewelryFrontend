import { useAppSelector } from '../redux/hooks';
import { translations } from './translations';

export function useT() {
  const lang = useAppSelector(s => s.ui.lang);
  return translations[lang];
}
