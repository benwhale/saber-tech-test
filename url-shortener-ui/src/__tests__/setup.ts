import '@testing-library/jest-dom';

// Mock next/navigation if needed
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://test-api.com';