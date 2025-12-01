import {Skeleton} from '@/app/components'
import {Heading, Flex, Text, Card, Box} from '@radix-ui/themes';

const IssueDetailedPageLoading = () => {
  return (
    <Box className='space-y-5 max-w-xl'>
      <Heading><Skeleton/></Heading>
      <Flex className='space-x-3 mt-3'>
        <Skeleton width="5rem" />
        <Text>
            <Skeleton width="8rem"/>
        </Text>
      </Flex>
      <Card className='prose'>
        <Skeleton count={4} />
      </Card>
    </Box>
  )
}

export default IssueDetailedPageLoading
