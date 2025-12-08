import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '../../../auth';

export async function GET(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({}, { status: 401 });

    const users = await  prisma.user.findMany({orderBy:{name: 'asc'}})
    return NextResponse.json(users, {status: 200});
}