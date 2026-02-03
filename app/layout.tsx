/**
 * Root Layout
 * 
 * This is the root layout for the Next.js App Router.
 * 
 * Responsibilities:
 * - Define HTML structure
 * - Include global styles (Tailwind CSS)
 * - Set up metadata
 * - Wrap all pages
 * 
 * This is a SERVER component by default (no 'use client' directive).
 * It can be used for:
 * - Setting up providers
 * - Including analytics
 * - Global navigation
 * - SEO metadata
 */

import type { Metadata } from 'next';
import './globals.css';

/**
 * Metadata for SEO and social sharing
 * 
 * This is automatically handled by Next.js App Router.
 * The metadata is rendered in the HTML <head>.
 */
export const metadata: Metadata = {
  title: 'User Management App',
  description: 'A Next.js application for managing users with search and filter capabilities',
};

/**
 * Root Layout Component
 * 
 * @param children - Page content to render inside the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
