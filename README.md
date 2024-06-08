# ArmorE - React

## Summary

ArmorE - React is a react component library for everything authentication. [WRITE BETTER DESCRIPTION LATER]

## Creating a package

- Create a template for your authentication form if it does not already exists
  - Template structure:
     - template-name
       - components
         - Component1
           - Component1.tsx
         - Component2
           - Component2.tsx
         - Component3 (this component is a container for the other two sub-components)
            - Component3.tsx
       - index.ts (exports all components) 
       - styles.css (should be empty)
       - stories (empty directory)
       
- Create a directory in packages with name [type]-style[number]. For example, signup-style3
- Copy the project structure and files exactly from templates
- Rename component names to include identifier for this specific package (eg username --> username-style3)
- Add a package json to the root directory of the package with react and react-dom as peerDependencies
  - cd into package directory in terminal
  - run the command "npm init -y"
  - copy and paste this object into package.json

"peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }

- Add a stories directory to the root directory and create stories for the components as needed
  - Look in packages/examples-style1 to see how to create stories. Run the command "npm run storybook" to view all stories
- Create test files as needed
- Modify the components and styles.css as needed

## Publishing a package
[WRITE INSTRUCTIONS LATER]
