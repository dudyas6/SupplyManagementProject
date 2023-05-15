import React from 'react'

export default function Table() {
    return (
        <div className='flex flex-col items-center'>
        <div className='mt-4 mb-2 w-full'>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full float-right'>Add Item</button>
        </div>
        <div className='w-full max-w-[calc(100vh-120px)]'>
            <table className='table-auto min-w-full'>
                    <thead>
                        <tr>
                        <th className='w-'>Name</th>
                        <th className=''>Quantity</th>
                        <th className='w-[calc(20vh)]'>Price</th>
                        <th className='w-[calc(20vh)]'>Total</th>
                        <th className='w-[calc(20vh)]'>Controls</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border px-4 py-2'>Blabla</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2'>858</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2 flex items-center justify-center'>
                                <input type='checkbox' className='mr-2'></input>
                            </td>                          
                        </tr>
                        <tr className='bg-gray-200'>
                        <td className='border px-4 py-2'>Blabla</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2'>858</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2 flex items-center justify-center'>
                                <input type='checkbox' className='mr-2'></input>
                            </td>  
                        </tr>
                        <tr className=''>
                        <td className='border px-4 py-2'>Blabla</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2'>858</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2 flex items-center justify-center'>
                                <input type='checkbox' className='mr-2'></input>
                            </td>  
                        </tr>
                        <tr className='bg-gray-200'>
                        <td className='border px-4 py-2'>Blabla</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2'>858</td>
                            <td className='border px-4 py-2'>Adam</td>
                            <td className='border px-4 py-2 flex items-center justify-center'>
                                <input type='checkbox' className='mr-2'></input>
                            </td>  
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
  }
  