import Header from '@/components/Header'
import React from 'react'

const Settings = () => {
  const userSettings = {
    username: "johndoe",
    email: "johndoe@gmail.com",
    teamName: "Development Team",
    roleName: "Developer"
  }
  const labelStyles = "block text-sm font-mendium dark:text-white"
  const textStyles = "block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white"

  return (
    <div className='p-8'>
        <Header name='Settings' />
        <div className='space-y-4'>
            <div className={labelStyles}>Username</div>
            <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div className='space-y-4 mt-2'>
            <div className={labelStyles}>Email</div>
            <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div className='space-y-4 mt-2'>
            <div className={labelStyles}>Team</div>
            <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div className='space-y-4 mt-2'>
            <div className={labelStyles}>Role</div>
            <div className={textStyles}>{userSettings.roleName}</div>
        </div>
    </div>
  )
}

export default Settings