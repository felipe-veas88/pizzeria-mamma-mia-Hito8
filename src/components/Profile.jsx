import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const Profile = () => {
  const { logout, fetchProfile } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await fetchProfile();
      setProfile(data);
    };
    fetchProfileData();
  }, [fetchProfile]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? <p>Email: {profile.email}</p> : <p>Loading profile...</p>}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
