'use client'
import { Issue, Status } from '@/app/generated/prisma/client';
import { Select } from '@radix-ui/themes'
import toast, {Toaster} from 'react-hot-toast';
import { statuses } from './IssueStatusFilter';

const StatusSelect = ({issue} : {issue: Issue}) => {

    const onChange = async (status : Status) => {
        try{
            const res = await fetch(`/api/issues/${issue.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: status }),
            });
            if (!res.ok) {
                toast.error("Status could not be saved.");
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
            onValueChange={onChange}
            defaultValue={issue.status}
        >
            <Select.Trigger />
            <Select.Content>
            <Select.Group>
                {statuses && statuses.map(status => <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>)}
            </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster/>
    </>
    )
}

export default StatusSelect
