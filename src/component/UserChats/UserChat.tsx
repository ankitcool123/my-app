import { useLocation } from "react-router-dom";
import Header from "../nav/Header";
import SideBar from "../nav/SideBar";
import "./UserChat.css"
import myImg from "../Images/default (1).jpg"

const baseUrl: any = process.env.REACT_APP_BASE_URL;

function UserChat(props: any) {


    // ------- data passing with the help of state navigation without props start -------// 

    const { state } = useLocation();

    // ------- data passing with the help of state navigation without props end -------// 

    return (
        <div>
            <Header />
            <div className="row contactBg">
                <div className="col-1">
                    <SideBar />
                </div>
                <div className="col-10 mainCard12">
                    <div className="card edituser1" >
                        <div className="container">
                            <div className='col-sm-4 '>
                                <div className="card picStyle">
                                    <div className="card picStyle2">
                                        <img src={state.user.photoUrl ? state.user.photoUrl : myImg} className="card-img-top pivStyle1" alt="image" />
                                    </div>
                                    <div className="marginL">

                                    <h5>  Location : </h5> {state.user.country ? state.user.country : "Bhopal"}
                                    {console.log(state.user)}
                                    </div>
                                    <div  className="marginL">
                                      <h5>  Age: </h5> {state.user.age}
                                    </div>
                                    <div  className="marginL">
                                      <h5>  Last active: </h5> {state.user.lastActive}
                                    </div>
                                    <div className="borderPagina"></div>
                                    <div className="buttonMargin">
                                    <button type="button" className="btn btn-danger" style={{borderRadius:"0", width:"120px"}}>Like</button>
                                    <button type="button" className="btn btn-success" style={{borderRadius:"0", width:"120px"}}>Message</button>
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