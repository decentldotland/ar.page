# AR.page Hackathon
Starting from September 9th, The AR.page Hackathon is open to all developers!
AR.page is a cross-chain social identity aggregator. All your blockchain info and activity, finally stored in one place.

## Prize Pool
First prize: `4,500 USDC` + an [Ark NFT](https://mint.decent.land/) (0.3 ETH value)

Runner-up pool: `6,000 USDC` split between accepted entrants

## Dates and Timing
**Start / end dates**: September 19th - October 31st

**Voting**: November 1st - November 7th

**Final Result Announcement**: November 7th


## Requirements
Submissions must:
1. Be in the context of ar.page, with a link to the live functioning, and running instance of the app itself, as well as a link to the repository it is stored within.
2. Include a brief description of the application and functionality in the GitHub repo.
3. Be your own original work.
4. Only change items within the `hackathon` folder.
5. Be open source, with the full source code available on GitHub or another open code hosting site.

## Guidelines
We support several different profile extension options by default:

![Info](images/info.jpg "Extension options")

All the profile items are considered widgets, and adding new widgets is as simple as heading over to `api/widgets.tsx` and adding a new JSX element into the array!

```JSX
export function HackathonTopWidgets (arkProfile: Res | undefined) {
  // It's important to wrap custom components in Widget tag
  const NewWidget = <Widget canRender={true}>Hi, I am a new widget!</Widget>;

  const widgets = [NewWidget];

  return widgets;
};
```

Check out the `api` folder for more code examples. If you'd like to be able to extend other parts of our UI, let us know in our [discord](https://discord.gg/decentland)!

### App ideas
- Add badges to AR.page profiles to show DAO and PSC membership
- Aggregate tweets or other linked social web3 data sources like Mirror.xyz in AR.page activity feeds
- Integrate Arweave’s Stamp protocol - show a user’s stamps, and allow users to stamp other profiles
- Add more ways to get verified status with VouchDAO or with ArNS name linking
- Build components for subsections of a user’s collection, e.g: all of their metaverse land, all of their ANS names
- Tree view for all connected Ark Protocol wallets across different chain

You can also suggest your ideas in our [discord](https://discord.gg/decentland) channel (#app-ideas)
### Contribution Tips

Feel free to change items within the `hackathon` folder as you see fit. There are no restrictions to using third-party libraries or data fetching.

To properly judge your submission we'd need to review both your code and the result. To make things simpler for us, please leave comments where applicable to help us understand your work better.

### CSS Documentation
The project uses a mix of [TailwindCSS](https://tailwindcss.com) + [daisyUI](https://daisyui.com), which provides all of the components, styles and colors.
When writing custom components, keep in mind to use daisyUI color scheme to keep light/dark themes consistent.

`[prefix]-base-100` - The default background color of the website
`[prefix]-base-200` - Slightly darker version of the default background color
`[prefix]-primary` - Default primary color for all the existing UI components

daisyUI supports mixing theme colors, so you can do `bg-primary`, `text-base-100`, `bg-info`, etc. For all existing daisyUI color scheme patterns, check out the (theme generator)[https://daisyui.com/theme-generator].

Finally, you may add new `tailwindcss.config.js` variables / modules. However, please avoid editing existing parameters.
