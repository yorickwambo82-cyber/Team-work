// Authentication Service
import { users } from '../utils/helpers';

const AUTH_KEY = 'istag_auth_user';

export const authService = {
    // Validate user credentials
    login(username, password, rememberMe = false) {
        const user = users.find(
            u => u.username.toLowerCase() === username.toLowerCase() &&
                u.password === password
        );

        if (user) {
            const authData = {
                id: user.id,
                username: user.username,
                role: user.role,
                language: user.language,
                defaultTheme: user.defaultTheme,
                rememberMe
            };

            if (rememberMe) {
                localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
            } else {
                sessionStorage.setItem(AUTH_KEY, JSON.stringify(authData));
            }

            return { success: true, user: authData };
        }

        return { success: false, error: 'Invalid username or password' };
    },

    // Logout user
    logout() {
        localStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(AUTH_KEY);
    },

    // Get current user
    getCurrentUser() {
        const authData = localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);
        return authData ? JSON.parse(authData) : null;
    },

    // Check if user is authenticated
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
};
