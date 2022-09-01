WIP
# Hackathon rules and guidelines

## Rules
1. Submissions must be related to Ark Protocol / decent.land or improve / build upon the UI of user pages of ar.page
2. 
3. Submissions should limit fetches to no more than 2 urls
4. Submissions should limit new package installs to no more than 2 packages
5. Submissions should preferrably use existing components / libraries
6. Submissions should not change other parts of the webpage

## Guidelines

### CSS Documentation
The project uses a mix of (TailwindCSS)[https://tailwindcss.com] + (daisyUI)[https://daisyui.com], which provides all of the styles and colors.
When writing custom components, keep in mind to use daisyUI color scheme to keep light/dark themes consistent.

`[prefix]-base-100` - The default background color of the website
`[prefix]-base-200` - Slightly darker version of the default background color
`[prefix]-primary` - Default primary color for all the existing UI components

daisyUI supports mixing theme colors, so you can do `bg-primary`, `text-base-100`, `bg-info`, etc. For all existing daisyUI color scheme patterns, check out the (theme generator)[https://daisyui.com/theme-generator].

Finally, you're free to add new `tailwindcss.config.js` variables / modules. However, please avoid editing existing UI parameters.

