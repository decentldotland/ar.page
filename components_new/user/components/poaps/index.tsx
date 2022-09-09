import Image from 'next/image';
import { Res } from '../../../../src/types';
import { Divider } from '../reusables';

export function Poaps({ props }: { props: Res }) {
  const { POAPS } = props;

  return (
    <>
      <Divider /> 
      <h1 className="text-left font-inter font-bold text-xl">POAPS</h1>
      <div className="mt-4 flex gap-x-4 carousel">
        {POAPS.map((p, i) => (
          <div key={i} className="carousel-item">
            <label className="flex items-center cursor-pointer modal-button" htmlFor="my-modal-4">
              <Image loader={() => p.event.image_url} src={p.event.image_url}  width={112} height={112} />
            </label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer backdrop-blur-md">
              <label className="modal-box relative" htmlFor="">
                <div className="flex flex-col items-center">
                  <Image loader={() => p.event.image_url} src={p.event.image_url} width={112} height={112} className="mt-4 mb-8" />
                </div>
                <div className="flex flex-col gap-y-2 text-center">
                  <div className="font-semibold">{p.event.name}</div>
                  <div className="">Obtained on {p.event.start_date} </div>
                  <div><a href={p.event.event_url} className="link-primary after:content-['_↗']">{p.event.event_url}</a></div>
                </div>
              </label>
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
