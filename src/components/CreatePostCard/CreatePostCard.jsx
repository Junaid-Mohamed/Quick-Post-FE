/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { MdOutlineGifBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/Posts/postSlice.js";


const CreatePostCard = ({closeModal}) => {

    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const handleSelectImage = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute("type","file");
        input.setAttribute("accept", "image/*,video/*"); // Allow both images and videos
        input.click();

        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if(file){
                setSelectedImage(file);
                toast.success(`${file.type.startsWith("image/") ? "Image" : "Video"} selected.`);
            }
        }
    },[setSelectedImage])

    
    const user = useSelector((state)=> state.auth.user);
    const {postSliceStatus} = useSelector((state)=> state.posts);
    const dispatch = useDispatch();

    const handleOnClickPost = async () =>{
        const token = localStorage.getItem("QP-authToken");
        if(!token) toast.error("login to create post");

        const formData = new FormData();
        formData.append("content",content);
        if(selectedImage){
            formData.append("file",selectedImage);
        }

        const toastId = toast.loading("Posting....");

        await dispatch(createPost({formData,token}))
        if(postSliceStatus === "success"){
            setContent("");
            setSelectedImage(null);
            closeModal?.();
            toast.success("Posted successfully.", {id: toastId});
        }
    }
    return(
        <div>
            <div className="grid grid-cols-12 my-4 border gap-2 border-white bg-white cursor-pointer p-5">
                <div className="col-span-1">
                    <img src={user?.profileImageURL} alt="user-image" className="rounded-full" width={50} height={50}/>
                </div>
                <div className="col-span-11">
                    <textarea onChange={(e)=>setContent(e.target.value)} value={content} className="w-full bg-gray-100 p-3 " rows={4} name="tweet" placeholder="Write something interesting ..."></textarea>
                    {selectedImage && (
                        <div className="mt-3">
                        {selectedImage.type.startsWith("image/") ? (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="selected"
                                className="max-h-40 w-fit rounded-md"
                            />
                            ):(
                            <video
                                src={URL.createObjectURL(selectedImage)}
                                controls
                                className="max-h-40 w-fit rounded-md"
                            />
                        )}
                        </div>
                    )}
                    <div className="flex justify-between text-lg mt-3 ">
                        <div className="flex justify-between gap-3">
                        <FaImage onClick={handleSelectImage} />
                        <MdOutlineGifBox />
                        <BsEmojiSmile />
                        </div>
                        <div>
                            <button className="text-white bg-red-400 rounded-lg px-3" onClick={handleOnClickPost} >Post</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreatePostCard;