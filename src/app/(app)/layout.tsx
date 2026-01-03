import AppWrapper from '@/components/Wrapper/AppWrapper'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <AppWrapper>
        {children}
    </AppWrapper>
  )
}

export default layout
