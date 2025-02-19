import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
  }

  try {
    const content = await fs.readFile(path.join(process.cwd(), 'data', filePath), 'utf8');
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
} 