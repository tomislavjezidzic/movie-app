![GitHub package.json version](https://img.shields.io/github/package-json/v/bornfight-studio/bfs-nextjs-starter?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/bornfight-studio/bfs-nextjs-starter?style=flat-square)

## Versions

-   Next.js 15.0.0-rc.0
-   React 18.3.1
-   ReactDOM 18.3.1
-   Node 20.x

## Setup

```bash
nvm use         # sets node and npm version
yarn install    # installs required packages
yarn dev        # starts local dev environment
```

### (S)CSS

-   based on **ITCSS** architecture (read about
    it [here](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)) and inspired
    by [inuitcss framework](https://github.com/inuitcss/inuitcss)
-   uses postcss by default - autoprefixer will automatically add vendor prefixes
    by [browserslist ruleset defined inside package.json](https://github.com/postcss/autoprefixer#browsers)

### Scripts

```bash
yarn dev      # build and watch file changes for development
yarn build    # build for production
yarn start    # run the application
yarn lint     # lint scss and js files with stylelint
yarn format   # format scss and js files with prettier
```

## Custom hooks

| Hook name               | Description                                                                      | Usage                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| useAccordion            | opens and close accordion item                                                   | `JS const { clickAction, openedFlag } = useAccordion({ expandableWrapper, expandableInnerContent }); ` |
| useCreatePortalInBody   | creates portal                                                                   | `JS const children = useCreatePortalInBody( name, element ); `                                         |
| useCurrentRefs          | returns object with array of passed refs                                         | `JS const refs = useCurrentRefs( items[] ); `                                                          |
| useInterval             | creates react compliant `setInterval()`                                          | `JS const interval = useInterval( callback(), delay, deps ); `                                         |
| useIsMobile             | returns a boolean if the resolution is smaller/larger than the passed breakpoint | `JS const isMobile = useIsMobile( breakpoint ); `                                                      |
| useIsTouchDevice        | checks the device has touch and returns a boolean                                | `JS const isTouchDevice = useIsTouchDevice(); `                                                        |
| useMouse                | returns mouse event props                                                        | `JS const mouseMoveDate = useMouse(); `                                                                |
| useOutsideClick         | tracks click event outside the element                                           | `JS const clickOutside = useOutsideClick( ref, handler(), options{} ); `                               |
| usePreviousDifferent    | checks if previous value is different then current                               | `JS const isPreviousValueDifferent = usePreviousDifferent( currentValue ); `                           |
| useTriggerWindowResize  | window custom resize event                                                       | `JS const customWindowResize = useTriggerWindowResize(); `                                             |
| useWindowResize         | window resize event                                                              | `JS const windowResize = useWindowResize( callback() ); `                                              |
| useWindowScrollPosition | returns window scroll position                                                   | `JS const scrollPosition = useWindowScrollPosition(); // { scrollX, scrollY } `                        |
| useWindowSize           | returns window scroll position                                                   | `JS const windowSize = useWindowSize(); // { width, height } `                                         |

## Favicon generator

https://realfavicongenerator.net/

## License

MIT © [BORNFIGHT STUDIO®](https://www.bornfight.studio)
