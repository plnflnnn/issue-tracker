import { Card, Heading, Text, Flex} from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import Markdown from 'react-markdown'
import { Issue } from '@/app/generated/prisma/client';

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
        <Heading>{issue.title}</Heading>
        <Flex className='space-x-3 mt-3'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose max-w-full' mt="4">
          <Markdown >{issue.description}</Markdown>
        </Card>
    </>
  )
}

export default IssueDetails
