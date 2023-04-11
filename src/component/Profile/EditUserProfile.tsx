import React, { useEffect, useState } from 'react';
import Header from '../nav/Header';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';



function EditUserProfile() {

  
  // ----------- user list start  -------- //
  const [users, setUsers] = useState([]);

  const getUsersData = async () => {
      await axios.get("https://localhost:5001/api/Users", {

      }).then(res => {
          const data = res.data
          setUsers(data);
      });
  };
  useEffect(() => {
      getUsersData();
  }, []);
  // ----------- user list End -------- //
    return (
        <div >
            <Header />
            <div className="con" style={{ backgroundColor: "whitesmoke" }}>
                <h1 > <i>Your profile </i> </h1>
               <div className="container">
                    <div className="row">
                        {users.map((user: any) =>
                            <div className='col-sm-4'>
                                <div className="card mb-4">
                                    <div className="card"  >
                                        <img src={user.photoUrl} className="card-img-top" alt="image" />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <span style={{ marginRight: "10px" }}>
                                                    <FaUserAlt />
                                                </span>
                                                {user.userName}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
export default EditUserProfile;
