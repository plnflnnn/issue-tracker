import {Skeleton} from '@/app/components'
import {Box, Container} from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Container>
      <Box className='space-y-5 w-80%'>
          <Skeleton height="2rem" />
          <Skeleton height="20rem" />
      </Box>
    </Container>

  )
}

export default IssueFormSkeleton
