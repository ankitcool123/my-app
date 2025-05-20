import React from "react";
import Header from "../nav/Header";
import "./Contacts.css";
import SideBar from "../nav/SideBar";
import { useRecoilState } from "recoil";
import { loaderAtom } from "../../state/userAtom";

function Status(props: any) {
  const [isLoading] = useRecoilState(loaderAtom);

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}
      <Header />
      <div className="row">
        {/* <div className="col-2">
                    <SideBar />
                </div> */}
        <div className="con col-10" style={{ backgroundColor: "whitesmoke" }}>
          <h1>Status</h1>
        </div>
      </div>
    </div>
  );
}
export default Status;
