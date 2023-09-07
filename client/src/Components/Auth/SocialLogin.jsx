import React from 'react'
import SocialButton from './SocialButton';
import { faFacebookF, faGoogle, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function SocialLogin() {
  return (
    <div className="flex flex-col items-center">
      <p className='py-3 text-base'>Or Sign In With Social Accounts</p>
      <div className="flex gap-4">
        <SocialButton icon={faFacebookF} />
        <SocialButton icon={faGoogle} />
        <SocialButton icon={faTwitter} />
        <SocialButton icon={faLinkedinIn} />
      </div>
    </div>
  );
}
