WIP
# ANS Hackathon

Starting from September 9th till TBA, The ANS Hackathon is open to all developers!
ANS is a domain protocol built on Arweave. The UI, while is in active development, lacks a few worthwhile components to display  on-chain user info in a dynamic way. We're seeking to build a decent few components using the rich APIs of Ark Protocol. 
## Prize Pool
We have several prize spots in our pool, totalling in REDACTED spots and `REDACTED USDC`:
**1st spot prize**: `REDACTED USDC`
**2nd-5th spot prizes**: `REDACTED USDC`

## Dates and Timing
**Start / end dates**： September 9th - TBA

**Voting**: TBA

**Final Result Announcement**: TBA

## Requirements
Submissions must:
1. Be in the context of ar.page, with a link to the live functioning, and running instance of the app itself, as well as a link to the repository it is stored within.
2. Include a brief description of the application and functionality in the GitHub repo.
3. Be your own original work.
4. Only change items within the `hackathon` / `user` folders.
5. Be open source, with the full source code available on GitHub or another open code hosting site.

## Guidelines

### Contribution Tips
You can get started hacking away by checking out the `hackathon/index.tsx` file. It has a few examples of components we'd love to build for the UI.

Feel free to change items within the `hackathon` / `user` folders as you see fit. If necessary, you may install new packages with `yarn`, and use `fetch` to get info from external websites.

To properly judge your submission we'd need to review both your code and the result. To make things simpler for us, please leave comments where applicable to help us understand your work better :)

If you have tips for improving our codebase, we're eager to hear your feedback!

### CSS Documentation
The project uses a mix of (TailwindCSS)[https://tailwindcss.com] + (daisyUI)[https://daisyui.com], which provides all of the components, styles and colors.
When writing custom components, keep in mind to use daisyUI color scheme to keep light/dark themes consistent.

`[prefix]-base-100` - The default background color of the website
`[prefix]-base-200` - Slightly darker version of the default background color
`[prefix]-primary` - Default primary color for all the existing UI components

daisyUI supports mixing theme colors, so you can do `bg-primary`, `text-base-100`, `bg-info`, etc. For all existing daisyUI color scheme patterns, check out the (theme generator)[https://daisyui.com/theme-generator].

Finally, you're free to add new `tailwindcss.config.js` variables / modules. However, please avoid editing existing UI parameters.
