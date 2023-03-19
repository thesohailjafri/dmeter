import React from 'react'
import { useParams } from 'react-router-dom'
import { BranchHeader } from '../../components'

export default function BranchAboutUsPage() {
  const params = useParams()
  const { branch_slug } = params
  return (
    <div>
      <BranchHeader
        homeUrl={`/branch/${branch_slug}`}
        menuUrl={`/menu/${branch_slug}`}
        aboutUsUrl={`/about/${branch_slug}`}
        orderUrl={`/orders/${branch_slug}`}
      />
    </div>
  )
}
