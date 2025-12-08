'use client'
import { Issue, User } from '@/app/generated/prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import toast, {Toaster} from 'react-hot-toast';

const AssigneeSelect = ({issue} : {issue: Issue}) => {

    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => await fetch('/api/users/', {method: 'GET'}).then(res => res.json()),
        staleTime: 60 * 1000,
        retry: 3
    });

    const defaultValue = issue.assignedToUserId === null ? "unassigned" : issue.assignedToUserId;

    if(isLoading) return <Skeleton />
    if(error) return null;

    const onChange = async (userId : string) => {
        const id = userId === "unassigned" ? null : userId;
        try{
            const res = await fetch(`/api/issues/${issue.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ assignedToUserId: id }),
            });
            if (!res.ok) {
                toast.error("Changes could not be saved.");
                return;
            }
            toast("Changes has been successfully saved.");
        } catch(error) {
            console.log(error);
        }
    }
    return (
    <>
        <Select.Root
            onValueChange={(userId) => onChange(userId)}
            defaultValue={defaultValue}
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value="unassigned">Unassigned</Select.Item>
                {users && users.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
            </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster/>
    </>
    )
}

export default AssigneeSelect
