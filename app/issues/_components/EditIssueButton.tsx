import React from 'react'
import {Button} from '@radix-ui/themes';
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from 'next/link';

const EditIssueButton = ({issueId}: {issueId: string}) => {
  return (
    <Button>
        <Pencil2Icon/>
        <Link href={`/issues/edit/${issueId}`}>Edit issue</Link>
    </Button>
  )
}

export default EditIssueButton
