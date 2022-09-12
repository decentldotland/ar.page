import { Widget } from '../../components/widgets';

// Important to put Widget Components in this file
export const HACKATHON_WIDGETS_TOP_PART = []; //[<HackathonWidgetExample />];


export function HackathonWidgetExample() {
  return (
    <Widget canRender={true}>
      <div className="text-2xl font-bold mb-2">Custom hackathon widget</div>
      <button className="bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 px-2.5 py-2 font-bold text-sm text-blue-500 rounded-2xl flex items-center cursor-pointer">
        do a thing
      </button>
    </Widget>
  )
}