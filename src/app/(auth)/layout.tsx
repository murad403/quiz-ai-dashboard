import AuthWrapper from '@/components/Wrapper/AuthWrapper'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  )
}

export default layout
