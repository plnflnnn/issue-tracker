import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Grid, Box, Flex, Container } from '@radix-ui/themes';
import IssueDetails from '../_components/IssueDetails';
import EditIssueButton from '../_components/EditIssueButton';
import DeleteIssueButton from '../_components/DeleteIssueButton';
import { Session } from 'next-auth';
import { auth } from '@/auth'; // NextAuth v5 server helper

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) notFound();
  let session: Session | null = null;
  try {
    session = await auth();
  } catch (err) {
    console.error('[auth] error fetching session (page):', err);
    session = null;
  }

  return (
    <Container>
      <Grid className="space-y-5" columns={{ initial: '1', sm: '5' }} gap="5">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>

        {session?.user ? <Box>
            <Flex direction="column" gap="4">
              <EditIssueButton issueId={id} />
              <DeleteIssueButton issueId={id} />
            </Flex>
          </Box> : null
        }
      </Grid>
    </Container>
  );
};

export default IssueDetailPage;
