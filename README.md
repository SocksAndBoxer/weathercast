# React + TypeScript + Vite

Description: An application that lets your search the weather for a chosen town. It displays the weather for the 7 next days and allows you to look at a specific day to have hourly details.

To install and run the project :

Install [pnpm](https://pnpm.io/installation) you don't have it on your machine

Then install the project :
pnpm install

And run it:
pnpm run dev

I used vitejs to launch the project quickly; with React and TS and I added Tailwind to improve the CSS a bit.

Issue: sunset and sunrise are null; the doc says this thing that I tried unsuccessfully.
_Caveats: The code generator does not handle sunrise and sunset correctly. It is supposed to be ".valuesInt64" instead of ".values". For the ensemble API, multiple members per variable are not correctly decoded. You will have to loop over `variables`._
