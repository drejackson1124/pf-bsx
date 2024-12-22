import React, { useState, useContext } from "react";
import helpers from "../js/functions";
import { UserContext } from "./UserContext";
import moment from "moment";

const ConfirmIdentity = () => {
    const { userCredentials, setUserCredentials, posts, setPosts } = useContext(UserContext);
    const [email, setEmail] = useState(userCredentials.email || "");
    const [passcode, setPasscode] = useState(userCredentials.passcode || "");
    

    const confirm = async () => {
        try {
            const response = await helpers.confirmIdentity({ email, passcode });
            if (response.statusCode === 200) {
                let results = JSON.parse(response.body);
                console.log(results);
                setPosts(results);
                setUserCredentials({
                    email,
                    passcode,
                    showPosts: true,
                });
            } else {
                alert("Your email and/or password is incorrect. Please contact support at pawfindernola@gmail.com.");
            }
        } catch (error) {
            console.error("Error confirming identity:", error);
        }
    };

    return (
        <div className="m-3">
            {!userCredentials.showPosts ? (
                <>
                    <p className="identity-message mt-5 mb-3">
                        Please use the email address and passcode you entered when you reported your lost pet.
                    </p>
                    <input
                        className="form-control form-control-lg mb-3"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        className="form-control form-control-lg mb-3"
                        placeholder="Enter passcode"
                        onChange={(e) => setPasscode(e.target.value)}
                        value={passcode}
                    />
                    <button className="btn btn-lg btn-primary" onClick={confirm}>
                        Submit
                    </button>
                </>
            ) : (
                <div className="m-3">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className="card mb-3" key={post.id}>
                                <div className="card-title text-center p-3 post-petsname" style={{fontSize:"25px"}}>{post.petsname}</div>
                                <div className="card-body p-0">
                                    {post.photoURL && (
                                        <img
                                            style={{borderRadius:"0"}}
                                            src={post.photoURL}
                                            alt={post.name}
                                            className="card-img-top pet-photo img-fluid"
                                        />
                                    )}
                                    {post.sightings ? (
                                        <div className="p-2">
                                            {/* <h6 className="mt-4">Last Seen</h6> */}
                                            {post.sightings.map((obj) => {
                                                return (
                                                    <div className="card mt-2">
                                                        <div className="card-body" style={{fontSize:"14px"}}>
                                                            Possibly seen on {obj.street} in {obj.city} <br/> <span className="" style={{fontStyle:"italic", fontSize:"9px"}}>{moment(obj.date).fromNow()}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <button className="btn btn-lg btn-success mt-2 text-start">I've found my pet</button>
                                        </div>
                                    ) : (
                                        <div className="text-start p-2">
                                            <p className="mt-2" style={{fontSize:"14px"}}>Pet hasn't been spotted yet</p>
                                            <button className="btn btn-lg btn-success mt-2 text-start">I've found my pet</button>
                                        </div>
                                    )}
                                    {/* <button className="btn btn-lg btn-success mt-4 text-start">I've found my pet.</button> */}
                                    {/* <button className="btn btn-lg btn-danger mt-2 ms-2">Edit</button> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ConfirmIdentity;
