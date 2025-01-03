import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/FeedCard/FeedCard";
import QuickPostLayout from "../components/Layout/QuickPostLayout";
import { fetchBookmarkedPost } from "../features/User/userSlice.js";

const BookmarkScreen = () => {

    const userBookmarkedPosts = useSelector((state)=> state.users.bookmarkPosts)
    const dispatch = useDispatch();

    // console.log(userBookmarkedPosts)
    useEffect(()=>{
        const token = localStorage.getItem("QP-authToken");
        dispatch(fetchBookmarkedPost({token})) 
    },[dispatch])

    return(
        <div>
            <QuickPostLayout>
                <h1 className="text-2xl font-bold mt-4" >Your Bookmarks</h1>
                {userBookmarkedPosts.map((post)=>(
                    <PostCard key={post.id} post={post} page="bookmark" />
                ))}
            </QuickPostLayout>
        </div>
    )
}

export default BookmarkScreen;