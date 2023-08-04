import { useLocation } from "react-router-dom";
import Header from "../nav/Header";
import SideBar from "../nav/SideBar";
import "./UserChat.css"
import myImg from "../Images/default (1).jpg";
import { useNavigate } from 'react-router-dom';
import Messages from "./Messages";

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function UserChat(props: any) {
    let navigate = useNavigate();

    // ------- data passing with the help of state navigation without props start -------// 

    const { state } = useLocation();

    // ------- data passing with the help of state navigation without props end -------// 

    return (
        <div>
            <Header />
            <div className="row">
                <div className="row contactBg">
                    <div className="col-1">
                        <SideBar />
                    </div>
                    <div className="col-10 mainCard12">
                        <div className="card edituser1" >
                            <div className="container">
                                <div className="row">
                                    <div className='col-sm-4 '>
                                        <div className="card picStyle">
                                            <div className="card picStyle2">
                                                <img src={state.user.photoUrl ? state.user.photoUrl : myImg} className="card-img-top pivStyle1" alt="image" />
                                            </div>
                                            <div className="marginL">
                                                <h5>  Name: {state.user.userName}  </h5>
                                            </div>
                                            <div className="marginL">

                                                <h5>  Location : </h5> {state.user.country ? state.user.country : "Bhopal"}
                                            </div>
                                            <div className="marginL">
                                                <h5>  Age: </h5> {state.user.age}
                                            </div>
                                            <div className="marginL">
                                                <h5>  Last active: </h5> {state.user.lastActive}
                                            </div>
                                            <div className="borderPagina"></div>
                                            <div className="buttonMargin">
                                                <button type="button" className="btn btn-danger" style={{ borderRadius: "0", width: "120px" }}>Like</button>
                                                <button type="button" className="btn btn-success" style={{ borderRadius: "0", width: "120px" }}>Message</button>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-7 picStyle12" >
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <nav>
                                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                            <div>
                                                                <button
                                                                    className="nav-link active"
                                                                    id="nav-home-tab"
                                                                    data-bs-toggle="tab"
                                                                    data-bs-target="#nav-home"
                                                                    type="button"
                                                                    role="tab"
                                                                    aria-controls="nav-home"
                                                                    aria-selected="true"
                                                                >About {state.user.userName}</button>
                                                            </div>
                                                            <button
                                                                className="nav-link"
                                                                id="nav-profile-tab"
                                                                data-bs-toggle="tab"
                                                                data-bs-target="#nav-profile"
                                                                type="button" role="tab"
                                                                aria-controls="nav-profile"
                                                                aria-selected="false">
                                                                    Interests
                                                            </button>
                                                            <button
                                                                className="nav-link"
                                                                id="nav-profile-tab"
                                                                data-bs-toggle="tab"
                                                                data-bs-target="#nav-profile"
                                                                type="button" role="tab"
                                                                aria-controls="nav-profile"
                                                                aria-selected="false">
                                                                    Photos
                                                            </button>
                                                            <button
                                                                className="nav-link"
                                                                id="nav-profile-tab"
                                                                data-bs-toggle="tab"
                                                                data-bs-target="#nav-profile"
                                                                type="button" role="tab"
                                                                aria-controls="nav-profile"
                                                                aria-selected="false">
                                                                    Messages
                                                            </button>
                                                        </div>
                                                    </nav>
                                                    <div className="tab-content" id="nav-tabContent">
                                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><Messages data={state.user.userName}/></div>
                                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><Messages/></div>
                                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><Messages/></div>
                                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><Messages/></div>
                                                        
                                                    </div>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}
export default UserChat;