import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom"

const Home = () => {
  return <div>Home</div>
}

const About = () => {
  return <div>About</div>
}

const Loading = ({ open }) => {
  return <>加载中...</>
}

// const router = createBrowserRouter([
//   { path: "/", element: <Home /> },
//   { path: "/about", element: <About /> },
// ])

export default function Root(props) {
  return (
    // <RouterProvider router={router} fallbackElement={<Loading open={true} />} />
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

// export default function Root(props) {
//   // { a: '123', name: '@pittle/react', singleSpa: {… }, mountParcel: ƒ }
//   // console.log(props)
//   return <section>{props.name} is mounted!</section>
// }
