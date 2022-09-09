import { useAns } from "ans-for-all";
import { Title } from "../components/reusables";
import { Res } from "../../../src/types";
import { Divider } from "../components/reusables";

// Example component
export function ANSIdentitiesManager({ props }: { props: Res }) {
  // const { address, walletConnected } = useAns();
  const { ANS, ENS, AVVY } = props;

  const NotSet = (text: string) => (
    <span className="text-gray-500 flex items-center">
      Not set 
      <button className="ml-2 rounded-full w-6 h-6 bg-gray-900/90 text-white tooltip tooltip-info" data-tip={text}>?</button>
    </span>
  )

  return (
    <div className="mb-8">
      <Title>Identities</Title>
      <div className="grid grid-cols-2 gap-y-3 mt-2">
        <span className="text-pink-600">ANS</span>
        <span className="text-primary">{ANS.currentLabel || NotSet("impossible...")}</span>
        <span className="text-purple-600">ENS</span>
        <span className="text-primary">{ENS || NotSet("The user has not connected their Ethereum domain")}</span>
        <span className="text-red-700">AVVY</span>
        <span className="text-primary">{AVVY || NotSet("The user has not connected their Avax domain")}</span>
      </div>
    </div>
  )
}
