// Domain configuration for the application
// Marketing site: daddy-leads.com
// App/Dashboard: app.daddy-leads.com

const isDevelopment = import.meta.env.DEV;

// Marketing domain (base domain)
export const MARKETING_DOMAIN = isDevelopment 
  ? '' 
  : 'https://daddy-leads.com';

// App domain (subdomain)
export const APP_DOMAIN = isDevelopment 
  ? '' 
  : 'https://app.daddy-leads.com';

// Authentication URLs (on app subdomain)
export const LOGIN_URL = `${APP_DOMAIN}/access?p=login`;
export const SIGNUP_URL = `${APP_DOMAIN}/access?p=signup`;
export const DASHBOARD_URL = `${APP_DOMAIN}/dashboard`;
