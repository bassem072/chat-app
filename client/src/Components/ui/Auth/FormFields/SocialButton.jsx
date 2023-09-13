import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SocialButton({icon}) {
  return (
    <button className='h-12 w-12 flex justify-center items-center border-paragraph border-[1px] rounded-full text-lg transition-all duration-500 hover:bg-paragraph hover:text-primary'>
        <FontAwesomeIcon icon={icon} />
    </button>
  )
}
