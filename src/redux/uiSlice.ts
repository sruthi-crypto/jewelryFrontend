import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Lang } from '../i18n/translations';

interface UIState {
  theme: 'light' | 'dark';
  lang: Lang;
}

const savedTheme = (localStorage.getItem('lumina_theme') as 'light' | 'dark') || 'light';
const savedLang  = (localStorage.getItem('lumina_lang')  as Lang)              || 'en';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: savedTheme, lang: savedLang } as UIState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
      localStorage.setItem('lumina_theme', action.payload);
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleTheme(state) {
      const next = state.theme === 'light' ? 'dark' : 'light';
      state.theme = next;
      localStorage.setItem('lumina_theme', next);
      if (next === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    },
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
      localStorage.setItem('lumina_lang', action.payload);
    },
  },
});

export const { setTheme, toggleTheme, setLang } = uiSlice.actions;
export default uiSlice.reducer;
