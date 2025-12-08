'use client'
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { useState } from "react";


const DeleteIssueButton = ({issueId}: {issueId: string}) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    console.log("issueId: " + issueId)

    const onDelete = async () => {
        try{
            setDeleting(true);
            console.log("issueId: " + issueId)
            await fetch(`/api/issues/${issueId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            router.push('/issues/list');
            router.refresh();
            setDeleting(false);
        } catch(error) {
            console.log(error);
            setDeleting(false);
            setError(true);
        }
    }

    return (
        <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button disabled={isDeleting} color="red">
                    Delete Issue
                    {isDeleting && <Spinner/>}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Confirm Deletion
                </AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue? This action cannot be undone.
                </AlertDialog.Description>
                <Flex mt="4" gap="3">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color="red" onClick={onDelete}>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Error</AlertDialog.Title>
                <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
                <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>OK</Button>
            </AlertDialog.Content>
        </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
