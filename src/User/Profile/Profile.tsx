import React from "react";
import HeaderLogin from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import ProfileContent from "./ProfileContent/ProfileContent.tsx";
import Footer from "../Home/footer/Footer.tsx";
class Profile extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto">
          <HeaderLogin />
          <ProfileContent />
          <Footer />
        </div>
      </>
    );
  }
}

export default Profile;
