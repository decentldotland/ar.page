import Image from 'next/image';
import { ARWEAVE_URL } from '../../../../src/constants';
import { Res } from '../../../../src/types';
import { Widget } from '../../components/widgets';

export function HackathonTopWidgets (arkProfile: Res | undefined) {
  // It's important to wrap custom components in Widget tag
  
  const widgets: any[] = [] //[<HackathonWidgetExample arkProfile={arkProfile} />];

  return widgets

};


export function HackathonWidgetExample({arkProfile}: {arkProfile: Res | undefined}) {

  return (
    <Widget canRender={!!arkProfile?.ANFTS?.koii} divider={true}> {/* canRender is a boolean that determines if the widget should be rendered */}
      <div className="text-xl font-semibold mb-2">Favourite NFT</div>
      <div className="w-[150px] h-[150px]">
        <Image width={150} height={150} objectFit="cover" src={ARWEAVE_URL + arkProfile?.ANFTS?.koii?.[0].id} className="rounded-xl" />
      </div>
    </Widget>
  )
};


// unused for now
export function HackathonBottomWidgets (arkProfile: Res | undefined) {
  // It's important to wrap custom components in Widget tag

  const widgets: any[] = [] //[<HackathonWidgetExample arkProfile={arkProfile} />];

  return widgets

};
