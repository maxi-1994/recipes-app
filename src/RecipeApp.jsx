import { AuthProvider } from './auth/context/AuthProvider';
import { AppRouter } from './router/AppRouter';

export const RecipeApp = () => {

    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}