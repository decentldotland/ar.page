import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { Snackbar } from '@mui/material';
import { useAns } from 'ans-for-all';
import React from 'react'
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';

// <CopyAddress user={user.userInfo.user} />
/**
 * Copy the current user's address 
 */
interface Props { 
    user: string
}

function CopyAddress({user}: Props) {
    const [isDark, setIsDark] = useRecoilState(isDarkMode);
    const [open, setOpen] = React.useState(false);
    const copy_text = (link: string) => { 
        setOpen(true);
        navigator.clipboard.writeText(link);
    }
    const {
        shortenAddress,
        walletConnected,
        address
    } = useAns();
  return (
    <div className={`px-2 py-2 sm:scale-90 md:scale-100 
        ${isDark ? ('bg-[#2c467e] text-white'): ('bg-gray-200 text-[#666]')} rounded-lg cursor-pointer`}
        onClick={() =>{ copy_text(user); }} >
        <div className="flex flex-row font-inter font-semibold text-sm">
            <h3 className='mr-1 hidden md:block'>
                {(shortenAddress as Function)(user)}
            </h3>
            <DocumentDuplicateIcon height={20} width={20} color={`${isDark? ('white') : ('#666') }`}
                strokeWidth={2} />
        </div>
       
        <Snackbar
            message="Copied to clipboard"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            open={open}
        />
    </div>
  )
}

export default CopyAddress