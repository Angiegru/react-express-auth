import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import { getEntries } from "../adapters/journalEntry-adapter";  
import UpdateUsernameForm from "../components/UpdateUsernameForm";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  const [ currentCards, setUserExistingCards ] = useState(null);


  useEffect(() => {
    console.log(id)
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();

    const loadEntries = async () => {
      const [ entries, error ] = await getEntries(id);
      if (error) return setErrorText(error.message);
      setUserExistingCards(entries);
    };

    loadEntries();
}, [id]);
console.log(currentCards);

  // useEffect(() => {
  //   console.log(id)
  //   const loadEntries = async () => {
  //     const [ entries, error ] = await getEntries(id);
  //     if (error) return setErrorText(error.message);
  //     setUserExistingCards(entries);
  //   };

  //   loadEntries();
  // }, [id]); //we want to reload everytime the id changes


  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <>
    <h1>{profileUsername}</h1>
    <h1>hi</h1>
    { !!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button> }
    <p>If the user had any data, here it would be</p>
    <p>Fake Bio or something</p>
    {
      !!isCurrentUserProfile
        && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    }
  </>;
}
