import { Sidebar } from './sidebar';
import { NameContent } from './profile';
import { userInfo } from '../../src/types';

export default function UserPage (props: userInfo) {
  return (
    <div className="md:flex h-full w-full relative">
      <div className="h-full max-h-full overflow-clip w-[250px] md:block hidden bg-base-100">
          <Sidebar />
      </div>
      <div className="w-full h-body overflow-y-scroll bg-base-200/25">
          <NameContent userInfo={props.userInfo} />
      </div>
    </div>
  )
}