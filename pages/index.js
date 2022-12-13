import React from 'react'
import Link from 'next/link'

const index = () => {
  return (
    <div>
      <Link className="text-purple-800 p-2" href="/dashboard">Dashboard</Link>
    </div> 
    )
}

export default index