// app/api/comments/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const commentsPath = path.join(process.cwd(), 'data', 'comments.json');

export async function GET() {
  const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
  return NextResponse.json(comments);
}

export async function POST(request) {
  const { name, comment } = await request.json();
  const newComment = { name, comment };

  const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
  comments.push(newComment);
  fs.writeFileSync(commentsPath, JSON.stringify(comments));

  return NextResponse.json(newComment, { status: 201 });
}