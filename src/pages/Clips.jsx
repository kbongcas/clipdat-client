import TestClip from '../components/TestClip'
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { clipsService } from '../services/clipsService'

const audience = import.meta.env.VITE_AUTH0_AUDIENCE

const Clips = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [clips, setClips] = useState([]);

  useEffect(() => {

    if (isAuthenticated == false) return;

    getUsersClips()
      .then((userClips) => {
        console.log(userClips.data)
        setClips(userClips.data)
      })
      .catch((reason) => {
        console.log("There was a error obtaining user's clips.")
        console.log(reason)
      });

  }, [getAccessTokenSilently, user?.sub])

  const getUsersClips = async () => {
    var token = await getAccessTokenSilently(
      {
        authorizationParams: { audience: audience }
      })
    return await clipsService.getMyClips(token)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
      {clips.map((item) => item.converted &&
        <TestClip
          key={item.id}
          name={item.name}
          desc={item.description}
          uri={item.uri} />)
      }
    </div>
  )

}

export default Clips