
import {Container, Table} from '@radix-ui/themes';
import IssueActions from '../_components/IssueActions';
import {Skeleton} from '@/app/components';

const IssuePageLoading = () => {
    const issues = [1,2,3,4,5,6,7,8,9,10];
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
            {issues.map(issue => (
                <Table.Row key={issue}>
                    <Table.Cell>
                    <Skeleton/>
                    <div className='block md:hidden'>
                        <Skeleton/>
                    </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                    <Skeleton/>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                        <Skeleton/>
                    </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table.Root>
    </Container>
  )
}


export default IssuePageLoading