import { GenericLabelInterface } from '../../../../src/types'
import { getDefaultLabels } from '../../components/labels'
import { GenericLabel } from '../../components/labels';
import { BsHeart } from 'react-icons/bs';

// Use this array for holding generic labels 
// for more info check out GenericLabelInterface, and examples in getDefaultLabels
export const HACKATHON_GENERIC_LABELS = []; // [ <GenericLabel /> ]

// Use this array for holding custom labels
// for more info check out GenericLabel component to see how to build your own custom label
export const HACKATHON_CUSTOM_LABELS = []; // [ <HackathonLabelExample />]


export function HackathonLabelExample() {
  return (
    <button className="bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 px-2.5 py-2 font-bold text-sm text-blue-500 rounded-2xl flex items-center cursor-pointer">
      <BsHeart className="mr-1" />
      Label
    </button>
  )
}