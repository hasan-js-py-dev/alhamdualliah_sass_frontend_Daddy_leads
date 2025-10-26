import { useEffect } from 'react';
import { MARKETING_DOMAIN, APP_DOMAIN } from '@/config/domains';

interface DomainRedirectProps {
  children: React.ReactNode;
  type: 'marketing' | 'app';
}

/**
 * Redirects users to the correct domain based on the route type
 * - Marketing pages should be on daddy-leads.com
 * - App pages (access/dashboard) should be on app.daddy-leads.com
 */
export const DomainRedirect = ({ children, type }: DomainRedirectProps) => {
  useEffect(() => {
    // Skip redirects in development
    if (import.meta.env.DEV) return;

    const currentHost = window.location.hostname;
    const currentPath = window.location.pathname + window.location.search;

    // Determine the correct domain based on type
    if (type === 'marketing' && currentHost === 'app.daddy-leads.com') {
      // Redirect to main domain for marketing pages
      window.location.href = `${MARKETING_DOMAIN}${currentPath}`;
    } else if (type === 'app' && currentHost === 'daddy-leads.com') {
      // Redirect to app subdomain for app pages
      window.location.href = `${APP_DOMAIN}${currentPath}`;
    }
  }, [type]);

  return <>{children}</>;
};
