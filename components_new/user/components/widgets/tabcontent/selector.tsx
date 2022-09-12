
interface tab {
  name: string;
  total?: number; // for showing total number of items in tab
};

interface SelectorInterface{
  tabs: tab[];
  selected: number;
  setSelected: (selected: number) => void;
  customJSX?: JSX.Element;
}

export default function Selector(props: SelectorInterface) {
  const { tabs, selected, setSelected, customJSX } = props;

  return (
    <div className="w-full font-inter mb-6">
      <div className="tabs carousel !flex-nowrap"> {/* flex-nowrap is to make tabs work with carousel */}
        {tabs.map((tab, index) => (
          <button key={index} className={`${selected === index && "tab-active"} carousel-item tab p-0 mr-4`} onClick={() => setSelected(index)}>
            {customJSX ? (
              customJSX
            ) : (
              <>
                <span className={`text-xl ${selected === index ? ('font-semibold'): ('font-medium')}`}>{tab.name}</span>
                <span className=" ml-2 bg-base-200 rounded-lg px-2 py-0.5 text-[#666] text-sm">{tab.total}</span>  
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
