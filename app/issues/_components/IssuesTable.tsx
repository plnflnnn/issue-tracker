import {Table} from '@radix-ui/themes';
import {IssueStatusBadge} from '@/app/components';
import Link from 'next/link';
import { Status } from '../../generated/prisma/enums';
import { Issue } from '../../generated/prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export interface IssueQuery {
    status: Status | "ALL";
    orderBy: keyof Issue;
    page: string;
}

interface Props {
  searchParams: IssueQuery,
  issues: Issue[]
}

export interface Column {
  label: string,
  value: keyof Issue,
  className?: string
}

const columns: Column[] = [
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'}
];


const IssuesTable =  async ({searchParams, issues}: Props) => {

   const {status, orderBy} = searchParams;

   if(!issues) return null;

  return (
      <Table.Root className='mt-5' variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns && columns.map(column => <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <Link href={{
                query: {status: status, orderBy: column.value}
              }}>{column.label}</Link>
              {column.value === orderBy && <ArrowUpIcon className='inline' />}
            </Table.ColumnHeaderCell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.length ? issues.map(issue => (
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
          )) : null}
        </Table.Body>
      </Table.Root>
  )
}

export const columnNames = columns.map(column => column.value);

export default IssuesTable;
