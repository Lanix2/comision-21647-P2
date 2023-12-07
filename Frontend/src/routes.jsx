import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import PostView from "./views/Posts";
import EliminarView from "./views/EliminarView";
import CrearView from "./views/CrearView";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import EditarView from "./views/EditarView";
import PostDetail from "./components/PostDetail";
import CrearComentarioView from "./views/CrearComentarioView";
import EditarComentarioView from "./views/EditarComentarioView";
import EliminarComentarioView from "./views/EliminarComentarioView";
import MyPostsView from "./views/MyPosts";

const Rutas = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/posts',
        element: <PostView />
    },
    {
        path: '/crearposts',
        element: <CrearView />
    },
    {
        path: '/editarposts/:id',
        element: <EditarView />
    },
    {
        path: '/eliminarposts/:id',
        element: <EliminarView />
    },
    {
        path: '/register',
        element: <RegisterView />
    },
    {
        path: '/login',
        element: <LoginView />
    },
    {
        path: '/detallesposts/:id',
        element: <PostDetail />
    },
    {
        path: '/crearcomentario/:id',
        element: <CrearComentarioView />
    },
    {
        path: '/editarcomentario/:id/:idComentario',
        element: <EditarComentarioView />
    },
    {
        path: '/eliminarcomentario/:id/:idComentario',
        element: <EliminarComentarioView />
    },
    {
        path: '/myposts',
        element: <MyPostsView />
    },

])

export { Rutas }