import BudgetList from '@/components/BudgetList'
import React from 'react'


function Budget() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default Budget