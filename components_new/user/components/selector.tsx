interface item {
  name: string;
  total: number;
}

export function Selector(props: {items: item[], selected: number, setSelected: (selected: number) => void}) {
  const { items, selected, setSelected } = props;

  return (
    <div className="w-full">
      <div className="tabs carousel !flex-nowrap"> {/* flex-nowrap is to make tabs work with carousel */}
        {items.map((item, index) => (
          <div key={index} className={`${selected === index && "tab-active"} carousel-item tab p-0 mr-4`} onClick={() => setSelected(index)}>
            <span className="font-sans text-lg font-medium">{item.name}</span>
            <span className=" ml-2 bg-gray-400 rounded-lg px-2 py-0.5 text-base-100 text-sm">{item.total}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
