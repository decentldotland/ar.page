import { useState } from "react";

interface item {
  name: string;
  total: number;
}

export function Selector(props: {items: item[], selected: number, setSelected: (selected: number) => void}) {
  const { items, selected, setSelected } = props;

  const [active, setActive] = useState(true)

  return (
    <div className="w-full font-inter mb-6 ">
      <div className="tabs carousel !flex-nowrap"> {/* flex-nowrap is to make tabs work with carousel */}
        {items.map((item, index) => (
          <div key={index} className={`${selected === index && "tab-active"} carousel-item tab p-0 space-x-2 mr-6`} onClick={() => setSelected(index)}>
            <span key={index} className={`text-xl  ${selected === index ? ('font-semibold text-black'): ('font-medium text-[#666]')}  `}>{item.name}</span>
            <span className=" ml-2 bg-base-200 rounded-lg px-2 py-0.5 text-gray-600 text-sm">{item.total}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
