# ArmorE - React

## Summary

ArmorE - React is a react component library for everything authentication. [make a better description later]

## Creating a package

- Create a template for your authentication form if it does not already exists
  - Template structure:
     - templateName
       - Components
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
- Add a package json with react and react-dom as peerDependencies 
