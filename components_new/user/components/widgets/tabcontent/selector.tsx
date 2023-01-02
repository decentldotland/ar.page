import { useRecoilState } from "recoil";
import { isDarkMode } from "../../../../../atoms";

interface tab {
  name: string;
  total?: number; // for showing total number of items in tab
  customJSX?: JSX.Element;
};

interface SelectorInterface{
  tabs: tab[];
  selected: number;
  setSelected: (selected: number) => void;
}

export default function Selector(props: SelectorInterface) {
  const { tabs, selected, setSelected } = props;
  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  return (
    <div className="w-full font-inter mb-6">
      <div className="tabs carousel flex-wrap md:!flex-nowrap justify-center md:justify-start"> {/* flex-nowrap is to make tabs work with carousel */}
        {tabs.map((tab, index) => (
          <button key={index} className={`${selected === index && "tab-active"} carousel-item tab p-0 mr-4`} onClick={() => setSelected(index)}>
            {tab.customJSX ? (
              tab.customJSX
            ) : (
              <>
                <span className={`text-lg ${selected === index ? ('font-semibold'): ('font-medium')}`}>{tab.name}</span>
                <span className={`ml-2 ${isDark ? ('bg-[#2c467e] text-white'): ('bg-gray-200 text-[#666]')} 
                  rounded-lg px-2 py-0.5 text-sm`}>
                  {tab.total}
                  </span>  
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
