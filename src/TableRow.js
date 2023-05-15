import React from 'react'

export default function TableRow({ item }) {
  return (
    <tr>
      <td className='border px-4 py-2'>{item.productName}</td>
      <td className='border px-4 py-2'>Adam</td>
      <td className='border px-4 py-2'>858</td>
      <td className='border px-4 py-2'>Adam</td>
      <td className='border px-4 py-2'>Adam</td>
      <td className='border px-4 py-2      items-center justify-center'>
          <input type='checkbox' className='mr-2'></input>
      </td>                          
  </tr>
  )
}
