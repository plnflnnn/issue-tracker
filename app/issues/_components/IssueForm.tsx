'use client';
import React, { useState } from 'react';
import { Button, TextField, Text, Box, Callout, Spinner } from '@radix-ui/themes';
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import {ErrorMessage} from '@/app/components';
import { Issue } from '@/app/generated/prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const IssueForm = ({issue}: {issue?: Issue}) => {
    const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<IssueFormData> =  async (data) => {
    try{
      setLoading(true);
      if(issue) {
          await fetch(`/api/issues/${issue.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      } else {
        await fetch('/api/issues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      }
      router.push('/issues/');
      router.refresh();
    } catch(error) {
      console.log(error);
      setError('An unexpected error.');
    } finally {
      setLoading(false);
    }
  }

    return (
      <div className='max-w-xl'>
        {error && (
          <Callout.Root color="red" className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <Box maxWidth="500px">
              <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title", { required: true })} />
            </Box>
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            <Controller name="description" control={control} defaultValue={issue?.description}
              render={({field}) => <SimpleMDE placeholder="Description" {...field} />}>
            </Controller>
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            <Button disabled={loading}>
              {issue ? 'Update Issue' : 'Submit New Issue'} {'  '}
              {loading && <Spinner size="1"/>}
            </Button>
        </form>
      </div>

  )
};

export default IssueForm;
