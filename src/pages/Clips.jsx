import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { clipsService } from '../services/clipsService'
import Clip from '../components/Clip';
import { LoadingClip } from '../components/Loading/LoadingClip';
import CopyToClipboardButton from '../components/Buttons/CopyToClipboardButton';
import DownloadButton from '../components/Buttons/DownloadButton';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE
const defaultSelectedClip = {
    uri: "https://media.giphy.com/media/myPdoRAlad0J2/giphy.gif",
    name: "",
    description: ""
}

const Clips = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(defaultSelectedClip);

  useEffect(() => {

    if (isAuthenticated == false) return;

    getUsersClips()
      .then((userClips) => {
        userClips.data.sort((a, b) => {
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
    var token = await getAccessTokenSilently()
    return await clipsService.getMyClips(token)
  }

  const onSelectedClipHandler = (key) =>{
    if(!clips) return;
    setSelectedClip(clips[key])
    window.my_modal_4.showModal()
  }

  
  /*
  const onBackHandler = () =>{
    setSelectedClip(null)
  }
  */

  /*
  if (selectedClip) return (
    <SingleClip
      url={selectedClip.uri}
      name={selectedClip.name}
      description={selectedClip.description}
      onBack={onBackHandler}
    />)

    */
  return (
    <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <div className="m-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
        {clips && clips.length > 0 ? (clips.map((item, i) =>
          <Clip
            key={i}
            index={i}
            url={item.uri}
            name={item.name}
            description={item.description}
            onSelect={onSelectedClipHandler}
          />
          )) : (
            Array.from({length: 16},(_,index) => <LoadingClip key={index} />) 
          )}
      </div>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box">
          <figure className="px-15 pt-2">
            <img src={selectedClip.uri ? selectedClip.uri : defaultSelectedClip.uri}
              alt="Shoes"
              className="rounded-xl" />
          </figure>
          <h2 className="mt-2 font-bold text-lg">{selectedClip.name}</h2>
          <p className="py-2">{selectedClip.description}</p>
          <div className="card-actions justify-end">
            {selectedClip.uri ?
              (<div className="flex justify-between items-center text-gray-400">
                <CopyToClipboardButton url={selectedClip.uri} />
                <DownloadButton url={selectedClip.uri} />
              </div>) :
              (<div className="badge badge-outline badge-warning gap-2">
                pending...
              </div>)
            }
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div >
  )
}

export default Clips