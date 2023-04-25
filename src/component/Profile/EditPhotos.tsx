import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authUserAtom } from '../../state';
import "./EditUserProfile.css";
import Swal from 'sweetalert2';
import { AiFillDelete } from 'react-icons/ai';
import { userAtom } from '../../state/userAtom';


const baseUrl: any = process.env.REACT_APP_BASE_URL;

function EditPhotos(props: any) {


    // ----------- user list start  -------- //
    const [authUser]: any = useRecoilState(authUserAtom);
    const [photoUrl, setPhotoUrl] = useState("");
    const [users, setUsers] = useRecoilState(userAtom);
    const [loading, setLoading] = useState<boolean>(false);

    const header = { headers: { Authorization: `Bearer ${authUser.token}` } };

    function handleImage(e: any) {
        console.log(e.target.files)
        setPhotoUrl(e.target.files[0])
    }

    const handleChange = async () => {
        const formData = new FormData()
        formData.append("file", photoUrl)
        axios.post(baseUrl + "Users/add-photo", formData, header).then((res) => {
            console.log(res);
            window.location.reload();
        })
    };

    const getUsersData = async () => {
        setLoading(true);
        const localuser: any = localStorage.getItem("user")
        const pUser = JSON.parse(localuser)
        axios.get(baseUrl + `Users/${pUser.username}`, header)
            .then((response) => {
                const data = response.data
                setUsers(data);
                console.log(data);
                setLoading(false);
            })
    };

    useEffect(() => {
        getUsersData();
    }, [loading]);

    // ----------- user list End -------- //


    // ------------- user profile update notification start -----------//
    function updateUsersProfile(id: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to update your profile',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                let parm = { userPhotoId: id }
                await axios.put(baseUrl + `Users/set-main-photo/${id}`, parm, header)
                    .then((response) => {
                        const data = response.data
                        console.log(data);
                        setLoading(false);
                    })
            }
        })
    };

    // function HandleClick1(e: any) {
    //     Swal.fire({
    //         title: "Auto close alert!",
    //         text: "I will close in 2 seconds.",
    //         timer: 6000
    //       });
    // }

    // ------------- user profile update notification end -----------//

    //------------- user profile delete notifiaation start ---------//

    function deleteUsersProfile(id: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete your profile',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                await axios.delete(baseUrl + `Users/delete-photo/${id}`, header)
                    .then((response) => {
                        const data = response.data
                        console.log(data);
                        setLoading(false);
                    })
            }
        })
    };
    //------------- user profile delete notifiaation end ---------//


    return (
        <div >
            <div className="container">
                <h5>Add Photos</h5>
                <div className="row" >
                    {
                        users.photos != null && users.photos.map((item: any) => {
                            return (
                                <div className='col-sm-4'>
                                    <div className="card mb-4">
                                        <div className="card" style={{ backgroundColor: "plum" }}>
                                            <a>
                                                <img src={item.url} onClick={() => updateUsersProfile(item.id)} className="card-img-top" alt="image" />
                                            </a>
                                            <div className="card-body">
                                                <AiFillDelete onClick={() => deleteUsersProfile(item.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
                <div >
                    <input type="file" className="form-control" id="customFile" onChange={handleImage} />
                </div>
                <button onClick={handleChange}>submit</button>
            </div>
        </div>
    );
}
export default EditPhotos;
