import React, { FunctionComponent } from 'react';
import { GenericLabelInterface, Res } from '../../../../src/types'
import { getDefaultLabels } from '../../components/labels'
import { GenericLabel } from '../../components/labels';
import { BsHeart } from 'react-icons/bs';



export function HackathonLabels(arkProfile: Res | undefined) {
  // Use this array for holding labels 
  // for using our labelling system, check out GenericLabelInterface, and examples in getDefaultLabels
  // const genericLabelArguments = {
  //   username: arkProfile?.ENS,
  //   classes: "bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100",
  //   link_to: {`https://app.ens.domains/search/${arkProfile?.ENS}`},`} ,
  //   canCopy: true,
  //   icon: <img height={13} width={13} src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002" alt="" />
  // }
  const labels: FunctionComponent<GenericLabelInterface>[] = [

  ]; // [ <GenericLabel {...genericLabelArguments} /> ]

  return labels;
}


export function HackathonLabelExample() {
  return (
    <button className="bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 px-2.5 py-2 font-bold text-sm text-blue-500 rounded-2xl flex items-center cursor-pointer">
      <BsHeart className="mr-1" />
      Label
    </button>
  )
}