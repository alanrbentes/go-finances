import 'styled-components';
import theme from './theme';

declare module 'styled-components'{
    type ThemeApp = typeof theme

    export interface DefaultTheme extends ThemeApp {
        
    }
}