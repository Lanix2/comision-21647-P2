import { RouterProvider } from "react-router-dom"
import { Rutas } from "./routes"
import DefaultLayout from "./layouts/DefaultLayout"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
    <AuthProvider>
      <DefaultLayout>
        <RouterProvider router={Rutas} />
      </DefaultLayout>
    </AuthProvider>
  )
}

export default App
