
import Post from '../components/Post';
import { useAuthContext } from '../context/AuthContext';


function PostView() {

    const { usuario } = useAuthContext()

    return (
        <Post usuario={usuario} />
    )
}

export default PostView