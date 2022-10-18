import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'


function RenameSongModal(){
    const {store} = useContext(GlobalStoreContext);
    let songname = "test"
    let artistname = "test"
    let youtubeid = "test"
    if(store.currentList && store.currentList.songs[store.markRenameSong] ){
        console.log(store.currentList)
        songname = store.currentList.songs[store.markRenameSong].title
        artistname = store.currentList.songs[store.markRenameSong].artist
        youtubeid = store.currentList.songs[store.markRenameSong].youTubeId
        document.getElementById("edit-song-modal-title-textfield").value = songname
        document.getElementById("edit-song-modal-artist-textfield").value = artistname
        document.getElementById("edit-song-modal-youTubeId-textfield").value = youtubeid
    }

    function handleConfirm(){
        store.renameSong()
        store.hideRenameSongModal()
    }

    function handleCancel(){
        store.hideRenameSongModal()
    }

    return(
        <div id="edit-song-modal" class="modal" data-animation="slideInOutLeft">
        <div id='edit-song-root' class="modal-root">
            <div id="edit-song-modal-header" class="modal-north">Edit Song</div>
            <div id="edit-song-modal-content" class="modal-center">
                <div id="title-prompt" class="modal-prompt">Title:</div><input id="edit-song-modal-title-textfield" class='modal-textfield' type="text" defaultValue={songname} />
                <div id="artist-prompt" class="modal-prompt">Artist:</div><input id="edit-song-modal-artist-textfield" class='modal-textfield' type="text" defaultValue={artistname}  />
                <div id="you-tube-id-prompt" class="modal-prompt">You Tube Id:</div><input id="edit-song-modal-youTubeId-textfield" class='modal-textfield' type="text" defaultValue={youtubeid} />
            </div>
            <div class="modal-south">
                <input 
                    type="button" 
                    id="edit-song-confirm-button" 
                    class="modal-button" 
                    value='Confirm' 
                    onClick={handleConfirm}/>

                <input 
                    type="button" 
                    id="edit-song-cancel-button" 
                    class="modal-button" 
                    value='Cancel' 
                    onClick={handleCancel}/>
            </div>
        </div>
    </div>
    );
}


export default RenameSongModal;





// export default class RenameSongModal extends Component {

//     render(){
//         const { RenameSongKeyPair,hideRenameSongModalCallback, RenameSongCallback,renameId } = this.props;
//         let songname = "";
//         let artistname = "";
//         let youtubeid = "";
//         if (RenameSongKeyPair && renameId &&  RenameSongKeyPair.songs[renameId-1]) {
//             songname = RenameSongKeyPair.songs[renameId-1].title
//             artistname = RenameSongKeyPair.songs[renameId-1].artist
//             youtubeid = RenameSongKeyPair.songs[renameId-1].youTubeId
            
//             document.getElementById("edit-song-modal-title-textfield").value = songname
//             document.getElementById("edit-song-modal-artist-textfield").value = artistname
//             document.getElementById("edit-song-modal-youTubeId-textfield").value = youtubeid
//         }

       
       
//         return(
//             <div id="edit-song-modal" class="modal" data-animation="slideInOutLeft">
//             <div id='edit-song-root' class="modal-root">
//                 <div id="edit-song-modal-header" class="modal-north">Edit Song</div>
//                 <div id="edit-song-modal-content" class="modal-center">
//                     <div id="title-prompt" class="modal-prompt">Title:</div><input id="edit-song-modal-title-textfield" class='modal-textfield' type="text" defaultValue={songname} />
//                     <div id="artist-prompt" class="modal-prompt">Artist:</div><input id="edit-song-modal-artist-textfield" class='modal-textfield' type="text" defaultValue={artistname}  />
//                     <div id="you-tube-id-prompt" class="modal-prompt">You Tube Id:</div><input id="edit-song-modal-youTubeId-textfield" class='modal-textfield' type="text" defaultValue={youtubeid} />
//                 </div>
//                 <div class="modal-south">
//                     <input 
//                         type="button" 
//                         id="edit-song-confirm-button" 
//                         class="modal-button" 
//                         value='Confirm' 
//                         onClick={RenameSongCallback}/>

//                     <input 
//                         type="button" 
//                         id="edit-song-cancel-button" 
//                         class="modal-button" 
//                         value='Cancel' 
//                         onClick={hideRenameSongModalCallback}/>
//                 </div>
//             </div>
//         </div>
//         );
//     }
// }