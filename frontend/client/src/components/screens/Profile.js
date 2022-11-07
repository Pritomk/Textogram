import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";



const Profile = () => {

    const { state, dispatch } = useContext(UserContext);
    const [myPics, setPics] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/post/myposts", {
            headers: {
                "Authorization": localStorage.getItem("auth_token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setPics(data);
            })
    }, [])

    return (
        <div className="profile-body">
            <div className="card">

                <div className="details">
                    <img src="https://picsum.photos/200/200" className="display-picture" />
                    <div className="name-details">
                        <h1>{state.name}</h1>
                        <div className="ac-details">
                            <div className="number-details" id="post-number">10 posts</div>
                            <div className="number-details" id="follower-number">10 followers</div>
                            <div className="number-details" id="following-number">10 following</div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="posts-image-body">
                    {
                        myPics.map(item => {
                            return(
                                <img key={item._id} src={item.pic} alt={item.title} className="post-image" />
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default Profile;