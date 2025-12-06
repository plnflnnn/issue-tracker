import { PropsWithChildren } from 'react'
import { Text } from '@radix-ui/themes'

const ErrorMessage = ({children}: PropsWithChildren ) => {
    if(!children) return null;
  return (
    <Text className='pb-4' as="p" color="red">{children}</Text>
  )
}

export default ErrorMessage
