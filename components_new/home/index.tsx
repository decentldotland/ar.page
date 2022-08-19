
import { Sections } from './sections'
import { Landing } from '../landing'


export default function Index() {
  return (
    <div className="w-full bg-base-100 overflow-hidden">
      <Landing />
      <Sections />
    </div>
    // <FAQ className="" />
  )
}
