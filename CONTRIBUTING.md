# Contributing

Thanks for helping contribute to quartermaster! The cap'n greatly appreciates it! Yargh!

## Developing

Every new component should be created within its own folder in the `src` directory. Component folders should be camel-cased to match the name of the component.

Within each component directory there should be an `index.tsx` file that exports the component as default. This structure facilitates the ability to import components individually, for example `import Button from "quartermaster/lib/Button"`.

Once you have created a new component, make sure to register it within `src/index.ts` with a line like `export { default as MyComponent } from "./MyComponent"`. This facilitates the ability to import all components together via something like `import { Avatar, Button } from "quartermaster"`.

Quartermaster uses styled-components for any component that requires some default CSS in order to function properly. Styled elements should be created in a file called `styles.ts` within your component directory and imported into your component as needed.

Quartermaster uses TypeScript in a simple, straightforward style. Please do leverage types but please do not go crazy with overly-complicated TypeScript techniques. (Hint: If you find yourself using things like `Pick` or `<typeof>`, you may have gone too far.)

Occasionally a component may require the use of a simple icon. Icons should be created as simple React function components that generate SVG output and should be kept in the `src/icons` directory. Feel free to open any of the existing icons and copy the pattern. Normally icons will take at least 2 props, namely `className` and `title` for ease of re-use and accessibility.

## Dependencies

Dependencies should only be added to quartermaster _if there is no other option_. If a dependency must be added, you should strongly consider adding it as a devDependency in order to help apps that rely on quartermaster avoid duplicate packages in their bundles.

## Testing/Building

Quartermaster does not yet implement unit tests. However, your components can be tested in real time using the setup provided in the `app` directory. Feel free to import your components into `app/index.tsx` and integrate them into the React app provided.

To run the test app, run `npm start` and visit `localhost:8080`.

Because quartermaster uses TypeScript, you may want to view your component's compiled output. You can do this by running `npm run build`. This will compile the TypeScript into a directory called `dist` which is ignored by git. From here you can see the compiled JavaScript as well as the automatically generated `.d.ts` files.

## Releasing

If you have write access to the repository you can create quartermaster releases using the automated release script.

To prepare for a new, automated release, first make sure that you have no uncommitted changes and that you are on the master branch. This is important because the release script will generate a new release from the branch you are currently on and it will automatically perform a git commit and a git push.

Run the script with `npm run release [inc | minor | major]`.

If no argument is provided, the script will default to creating an incremental release. In all cases, it takes the following actions:

1. Automatically generates a new release name/tag by incrementing the most recent release as appropriate.
1. Asks you to provide a description for the release (which can later be changed in github).
1. Creates a new git branch named for the release and checks out that branch.
1. Runs `npm run build` and copies the output to a directory called `lib`.
1. Commits and pushes changes to the new branch.
1. Registers the release/tag with github.
1. Returns to the master branch.

