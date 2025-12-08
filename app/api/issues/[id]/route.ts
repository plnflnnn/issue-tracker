import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '../../../../auth';

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const session = await auth();
    if (!session) return NextResponse.json({}, { status: 401 });

    const {id} = await params;
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if(!validation.success) {
        const error = JSON.parse(validation.error.message)[0];
        return NextResponse.json(error.message, {status: 400});
    }

    const {title, description, assignedToUserId, status} = body;
    if(assignedToUserId) {
        const user = await prisma.user.findUnique({where: {id: assignedToUserId}});
        if(!user) return NextResponse.json({error: 'Invalid user'}, {status: 400})
    }

    const issue = await prisma.issue.findUnique({where: {id: parseInt(id)}});
    if(!issue) return  NextResponse.json({error: 'Invalid issue'}, {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {id: parseInt(id)},
        data: {
            title,
            description,
            assignedToUserId,
            status
        }
    });

    return  NextResponse.json(updatedIssue, {status: 201});
}

export async function DELETE(request: NextRequest, {params} : {params: Promise<{ id: string }>}) {
    const session = await auth();
    if (!session) return NextResponse.json({}, { status: 401 });

    const {id} = await params;
    const issue = await prisma.issue.findUnique({where: {id: parseInt(id)}});
    if(!issue) return NextResponse.json({error: "Invalid issue"}, {status:404});

    await prisma.issue.delete({where: {id: parseInt(id)}});
    return NextResponse.json({});
}