import { ANSData, DUMMY_ANS_DATA } from '../../src/types';
import { MESON_URL } from '../../src/constants';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';
import Image from 'next/image';

export type AvatarOptions = {
  customUrl?: string;
  height?: string;
  width?: string;
};

function ProfileAvatar ({ansData, options} :{ansData: ANSData, options?: AvatarOptions}) {
  if (!ansData) ansData = DUMMY_ANS_DATA;
  let url: string;
  const { customUrl, height, width } = options || {};
  if (customUrl) url = customUrl;
  else {
    if (ansData.avatar) url = `${MESON_URL + ansData.avatar}`;
  }


  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  return (
    <div className={`flex rounded-full overflow-hidden mb-5 ${ isDark? ('border-8 border-[#0B111F]'):('border-8 border-[#fafafa]')} border-solid`}
      style={{
        backgroundColor: ansData.address_color || "#000",
        // border: '2px solid '+ (ansData.address_color),
        height: height || '175px',
        width: width || '175px',
      }}
    >
      {ansData.avatar ?
        <Image src={url!} 
          height={9999999} 
          width={99999999} 
          className="flex mx-auto object-cover w-full h-full" 
          alt="Profile" 
          quality={70}/>

        : 
        <div className="relative flex  items-center justify-center w-full h-full">
          <div className="absolute z-10 uppercase select-none bg-inherit text-white font-bold text-4xl font-inter">{ansData.currentLabel?.[0] || "?"}</div>
          <div className="absolute bg-gradient-to-l from-[#9E00FF] to-[#1273EA] rotate-45 origin-center w-full h-full"></div>
        </div>
      }
    </div>
  )
}

export function AvatarLoading() {
  return (
    <div className={`flex rounded-full h-[36px] w-[36px] overflow-hidden border-[2px] mt-1 animate-pulse bg-gray-400`}>

    </div>
    )

}

export default ProfileAvatar;