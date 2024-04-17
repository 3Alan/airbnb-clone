import { UnistylesRegistry } from 'react-native-unistyles';

import { defaultTheme } from './themes';

type AppThemes = {
  defaultTheme: typeof defaultTheme;
};

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({ defaultTheme }).addConfig({
  // you can pass here optional config described below
  adaptiveThemes: true
});
