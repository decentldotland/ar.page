import { TabContentTabs } from '../../components/widgets/tabcontent';

// Check out tabcontent file for more info and examples

export const HACKATHON_TABS = [
  // {
  //   name: "Friends",
  //   total: 9,
  //   component: <HackathonTabContentExample />
  // },
]

export function HackathonTabContentExample() {
  const friends = [
    'Bobby Sierra',
    'Robert De Niro',
    'Keanu Reeves',
    'Ryan Gosling',
    'Jake Gyllenhaal',
    'Brad Pitt',
    'Leonardo DiCaprio',
    'Joaquin Phoenix',
    'Christian Bale',
  ]  
  return (
    <div className="text-center">
      <h1 className="mb-4">Your friends:</h1>
      <div className="grid grid-cols-3">
        {friends.map((friend, index) => (
          <div className="text-center" key={index}>
            {friend}
          </div>
        ))}
      </div>
    </div>
  )
}