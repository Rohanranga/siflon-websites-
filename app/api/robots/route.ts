import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 0;

export function GET() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://siflon-group.com';
  const body = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};