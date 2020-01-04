import * as React from "react";
import { UserStore } from "../../context/user/userStore";
import ProfilePage from "./ProfilePage";

const ProfilePageIndex: React.FC = () => {
  return (
    <UserStore>
      <ProfilePage />
    </UserStore>
  );
};

export default React.memo(ProfilePageIndex);
