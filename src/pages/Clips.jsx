import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { clipsService } from '../services/clipsService'
import Clip from '../components/Clip';
import { LoadingClip } from '../components/Loading/LoadingClip';
import CopyToClipboardButton from '../components/Buttons/CopyToClipboardButton';
import DownloadButton from '../components/Buttons/DownloadButton';
import PageList from '../components/PageList';
import { DeleteButton } from '../components/Buttons/DeleteButton';
import { EmptyClips } from '../components/EmptyClips';
import { timePassedCalculator } from '../utils/timePassedCalculator';

const PAGE_SIZE = 12;
const defaultSelectedClip = {
  uri: "https://media.giphy.com/media/myPdoRAlad0J2/giphy.gif",
  name: "",
  description: ""
}

const ClipsLoadingState = {
  NotLoaded: "Not Loaded",
  Loading: "Loading",
  Loaded: "Loaded",
  LoadedWithError: "Loaded with Error",
}

const Clips = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(defaultSelectedClip);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rerenderModal, setRerenderModal] = useState(false);
  const [loadingState, setLoadingState] = useState(ClipsLoadingState.NotLoaded);

  useEffect(() => {

    if (isAuthenticated == false) return;
    getUsersClips(activePage, PAGE_SIZE)

  }, [getAccessTokenSilently, user?.sub])

  const getUsersClips = async (page, pageSize) => {

    var token = await getAccessTokenSilently({ ignoreCache: false })

    setLoadingState(ClipsLoadingState.Loading);
    await clipsService.getMyClips(token, page, pageSize)
      .then((userClips) => {
        setPages(Math.ceil(userClips.data.count / pageSize))
        setClips(userClips.data.clips)
        setLoadingState(ClipsLoadingState.Loaded)

      })
      .catch((reason) => {

        console.log("There was a error obtaining user's clips.")
        console.log(reason)
        setLoadingState(ClipsLoadingState.LoadedWithError)

      })
  }

  const onSelectedClipHandler = (key) => {
    setRerenderModal(!rerenderModal)
    setSelectedClip(clips[key])
    window.clipmodal.showModal()
  }

  const onPageSelect = async (selectedPage) => {
    setActivePage(selectedPage)
    await getUsersClips(selectedPage, PAGE_SIZE)
  }

  const onDelete = async () => {
    setClips(clips.filter((clip) => clip.id !== selectedClip.id))

    var token = await getAccessTokenSilently()
    clipsService.deleteClip(token, selectedClip.id)
      .catch((reason) => {
        console.log("There was a error deleting user's clip.")
        console.log(reason)
      });
    window.clipmodal.close()
  }

  const ModalContent = () => {
    return (
      <div>
        <figure className="px-15 pt-2">
          <img src={selectedClip.uri ? selectedClip.uri : defaultSelectedClip.uri}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <h2 className="mt-2 font-bold text-lg">{selectedClip.name}</h2>
        <p className="py-2">{selectedClip.description}</p>
        <div className="flex justify-between">
          <div className="flex flex-col-reverse">
            <div className="mb-2 stat-desc">
              {timePassedCalculator.getLocalDate(selectedClip.dateCreated)}
              <br />
              {timePassedCalculator.getMinTimePassedAsText(selectedClip.dateCreated)}
            </div>
          </div>
          <div className="card-actions justify-end">
            {selectedClip.uri ?
              (<div className="flex justify-between items-center text-gray-400">
                <CopyToClipboardButton url={selectedClip.uri} />
                <DownloadButton url={selectedClip.uri} />
                <DeleteButton onClick={onDelete} />
              </div>) :
              (<div className="badge badge-outline badge-warning gap-2">
                pending...
              </div>)
            }
          </div>
        </div>
      </div>
    )
  }

  const showClips = () => {

    return clips.map((item, i) => {
      let timePassedText = timePassedCalculator.getMinTimePassedAsText(item.dateCreated)
      return (< Clip
        key={i}
        index={i}
        url={item.uri}
        name={item.name}
        description={item.description}
        dateCreated={timePassedText}
        onSelect={onSelectedClipHandler}
      />)
    });
  }
  return (
    <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      {(loadingState === ClipsLoadingState.Loaded && clips.length > 0)
        && <PageList pages={pages} activePage={activePage} onPageSelect={onPageSelect} />
      }
      {(loadingState === ClipsLoadingState.Loaded && clips.length > 0)
        && <div className="m-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
          {showClips()}
        </div>
      }
      {(loadingState === ClipsLoadingState.Loaded && clips.length === 0)
        && <EmptyClips />
      }
      {
        (loadingState === ClipsLoadingState.Loading)
        && <div className="m-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
          {Array.from({ length: 16 }, (_, index) => <LoadingClip key={index} />)}
        </div>
      }
      {
        (loadingState === ClipsLoadingState.LoadedWithError)
        && <div className="">
          Error leading clips
        </div>
      }
      <dialog id="clipmodal" className="modal">
        <div className="modal-box m-14">
          <ModalContent rerender={rerenderModal} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div >
  )
}

export default Clips