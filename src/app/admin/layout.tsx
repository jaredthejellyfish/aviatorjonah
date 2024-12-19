import AdminNotAuthorized from '@/components/Admin/AdminNotAuthorized';
import { Protect } from '@clerk/nextjs';
import React from 'react'

type Props = {
    children: React.ReactNode
}

function CoursesLayout({children}: Props) {
  return (
    <Protect
      condition={(has) => has({ role: 'org:content_creators' }) || has({ role: 'org:owners' })}
      fallback={<AdminNotAuthorized />}
    >
      {children}
    </Protect>
  );
}

export default CoursesLayout

//Rh(929,Kw(Kt