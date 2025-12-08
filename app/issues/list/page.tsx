import {Container} from '@radix-ui/themes';
import { prisma } from '@/prisma/client';
import {Pagination} from '@/app/components';
import IssueActions from '../_components/IssueActions';
import { Status } from '../../generated/prisma/enums';
import { Metadata } from 'next';

import IssuesTable , { IssueQuery, columnNames }from '../_components/IssuesTable';

interface Props {
  searchParams: Promise<IssueQuery>
}

const IssuesPage = async ({searchParams}: Props) => {

  const {page, status, orderBy} = await searchParams;
  const params  = await searchParams;
  const pageNum  = parseInt(page) || 1;
  const pageSize = 10;

  type PrismaQuery = { where?: any; orderBy?: any; skip?: number, take?: number };

  const validStatuses = Object.values(Status);

  const whereObj =
    status && status !== 'ALL' && validStatuses.includes(status)
      ? { status }
      : undefined;

  const orderByObj =
    columnNames.includes(orderBy as any)
      ? { [orderBy]: 'asc' }
      : undefined;

  let query: PrismaQuery = {
    skip: (pageNum - 1) * pageSize,
    take: pageSize
  };
  if (whereObj) query.where = whereObj;
  if (orderByObj) query.orderBy = orderByObj;

  console.log(query);

  const issues = await prisma.issue.findMany(query);

  const totalCount = await prisma.issue.count({
    where: whereObj,
  });

  return (
    <Container>
      <IssueActions/>
      <IssuesTable issues={issues} searchParams={params} />
      <Pagination itemCount={totalCount} pageSize={pageSize} currentPage={pageNum} />
    </Container>
  )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export default IssuesPage;