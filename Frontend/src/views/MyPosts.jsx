
import MyPosts from '../components/MyPosts';
import { useAuthContext } from '../context/AuthContext';


function MyPostsView() {

    const { usuario } = useAuthContext()

    return (
        <MyPosts usuario={usuario} />
    )
}

export default MyPostsView