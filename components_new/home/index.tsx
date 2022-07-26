
import { Sections } from './sections'
import { Landing } from '../landing'


export default function Index() {
  return (
    <div className="w-full bg-[#fafafa] overflow-hidden">
      <Landing />
      <Sections />
    </div>
    // <FAQ className="" />
  )
}
