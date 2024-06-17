import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import singleSpaReact from "single-spa-react"
import Root from "./root.component"

const Dom = createRoot(document.getElementById("root"))

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null
  },
})

export const { bootstrap, mount, unmount } = lifecycles
