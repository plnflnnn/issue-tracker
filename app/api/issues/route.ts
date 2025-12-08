import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';
import { issueSchema } from '../../validationSchemas';
import { auth } from '../../../auth';

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success) {
        const error = JSON.parse(validation.error.message)[0];
        return NextResponse.json(error.message, {status:400});
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newIssue, {status: 201});
}