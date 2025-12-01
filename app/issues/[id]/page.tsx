import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Grid , Box} from '@radix-ui/themes';
import IssueDetails from './IssueDetails';
import EditIssueButton from './EditIssueButton';

const IssueDetailPage = async ({params} : {params: Promise<{ id: string }>} ) => {
  const {id} = await params;
  const issue = await prisma.issue.findUnique({where: {id: parseInt(id)}});

  if(!issue) notFound();

  return (
    <Grid className='space-y-5' columns={{initial: "1", md: "2"}} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={id}/>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
