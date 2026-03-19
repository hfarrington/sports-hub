import { NextResponse } from 'next/server';
import { fetchAllGames } from '@/lib/api';

export const revalidate = 300; // 5 minutes ISR

export async function GET() {
  try {
    const games = await fetchAllGames();
    return NextResponse.json(games, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('[API Route] /api/games failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 },
    );
  }
}
