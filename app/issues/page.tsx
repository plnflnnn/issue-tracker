import {Container, Table} from '@radix-ui/themes';
import { prisma } from '@/prisma/client';
import {IssueStatusBadge} from '@/app/components';
import IssueActions from './_components/IssueActions';
import Link from 'next/link';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <Container>
      <IssueActions/>
      <Table.Root className='mt-5' variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.length && issues.map(issue => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link key={issue.id} href={`/issues/${issue.id}`}>
                  {issue.title}
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status}/>
                  </div>
                  </Link>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status}/>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}

export const dynamic = 'force-dynamic';
export default IssuesPage
