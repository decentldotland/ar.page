# API

We use a mix of [ans-testnet](https://github.com/decentldotland/ANS) and [ARK API](https://github.com/decentldotland/ark-network), which provides all the user data that you can find on the frontend. To get familiar with the data, check out the TypeScript interfaces like [Res](/src/types/index.ts) or [userInfo](/src/types/index.ts).
We've integrated most of the items from both APIs, but check out the ones we haven't:

```typescript
  // Primary Ark Protocol response object
  interface Res {
    // List of addresses connected to ark via non-EVM-compatible blockchains, like Near, Solana, etc.
    exotic_addresses: any[];
    // ERC-721 NFTs (EVM-compatible NFTs)
    ERC_NFTS:         any |  { [key: string]: null | string }[];
    // Urbit IDs (more info: https://urbit.org/)
    URBIT_IDS:        any |  { [key: string]: null | string }[];
    // The RSS3 feed of the user (more info: https://rss3.io/)
    RSS3:             Rss3[];
  }
```

# Custom components

We support several different profile extension options by default:

![Info](../images/info.jpg "Extension options")

Labels like your ENS name, Twitter handle, or any other social media handle can be extended from the [labels.tsx](./labels.tsx) file.

Widgets can be extended from the [widgets.tsx](./widgets.tsx) file. All the components in a users' profile are considered widgets, and adding new widgets is as simple as adding a new JSX element into the array:

```TSX
export function HackathonTopWidgets (arkProfile: Res | undefined) {
  // It's important to wrap custom components in Widget tag
  const NewWidget = <Widget canRender={true}>Hi, I am a new widget!</Widget>;

  const widgets = [NewWidget];

  return widgets;
};
```

Tabs at the bottom can be extended from the [tabcontent.tsx](./tabcontent.tsx) file.

If you'd like to be able to extend other parts of our UI, let us know in our [discord](https://discord.gg/decentland)!

# CSS Documentation
The project uses a mix of [TailwindCSS](https://tailwindcss.com) + [daisyUI](https://daisyui.com), which provides all of the components, styles and colors.
When writing custom components, keep in mind to use daisyUI color scheme to keep light/dark themes consistent.

`[prefix]-base-100` - The default background color of the website
`[prefix]-base-200` - Slightly darker version of the default background color
`[prefix]-primary` - Default primary color for all the existing UI components

daisyUI supports mixing theme colors, so you can do `bg-primary`, `text-base-100`, `bg-info`, etc. For all existing daisyUI color scheme patterns, check out the [theme generator](https://daisyui.com/theme-generator).

Finally, you may add new [tailwindcss.config.js](/tailwind.config.js) variables / modules. However, please avoid editing existing parameters.

# Contribution Tips

Feel free to change items within the [hackathon](/components_new/user/hackathon/) folder as you see fit. There are no restrictions to installing third-party libraries or data fetching. However, please avoid removing existing libraries or components. If you'd like to add a new component that doesn't fit in the current design system, please let us know in our [discord](https://discord.gg/decentland) and we'll help you out!

To properly judge your submission we'd need to review both your code and the result. To make the review process simpler for us, please leave comments where applicable to help us understand your work better.
