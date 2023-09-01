import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { clipsService } from '../services/clipsService'
import Clip from '../components/Clip';
import SingleClip from './SingleClip';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE

const Clips = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);

  useEffect(() => {

    if (isAuthenticated == false) return;

    getUsersClips()
      .then((userClips) => {
        userClips.data.sort( (a, b) => {
          return new Date(b.dateCreated) - new Date(a.dateCreated)
        })
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

  const onSelectedClipHandler = (key) =>{
    if(!clips) return;
    setSelectedClip(clips[key])
    console.log('CLICKed!')
  }
  
  const onBackHandler = () =>{
    setSelectedClip(null)
  }

  if (selectedClip) return (
    <SingleClip
      url={selectedClip.uri}
      name={selectedClip.name}
      description={selectedClip.description}
      onBack={onBackHandler}
    />)

  return ( clips ?
    <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <div className="m-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
        {clips.map((item, i) =>
          <Clip
            key={i}
            index={i}
            url={item.uri}
            name={item.name}
            description={item.description}
            onSelect={onSelectedClipHandler}
          />)
        }
      </div>
    </div >
    : 
    <div>loading</div>
  )

}

export default Clips