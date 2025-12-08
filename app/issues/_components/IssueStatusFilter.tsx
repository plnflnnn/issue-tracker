'use client'
import { Status } from '@/app/generated/prisma/enums'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Statues {
    label: string,
    value: Status | "ALL"
}

export const statuses: Statues[] = [
    {label: "All", value: "ALL"},
    {label: "Open", value: "OPEN"},
    {label: "In Progress", value: "IN_PROGRESS"},
    {label: "Closed", value: "CLOSED"}
]

const IssueStatusFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const onChange = async (status: string) => {
        const params = new URLSearchParams();
        if(status) params.append('status', status);
        const orderBy =  searchParams.get('orderBy');
        if(orderBy) params.append('orderBy', orderBy);
        const query = params.size ? '?' + params.toString() : '';
        router.push(`/issues/list${query}`)
    }

    return (
    <Select.Root onValueChange={onChange} defaultValue={searchParams.get('status') || 'ALL'}>
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
            {statuses.map( status => <Select.Item key={status.label} value={status.value}>{status.label}</Select.Item>)}
        </Select.Content>
    </Select.Root>
    )
}

export default IssueStatusFilter
