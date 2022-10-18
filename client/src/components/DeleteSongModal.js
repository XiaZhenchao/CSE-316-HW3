import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'


function DeleteSongModal(){
    const {store} = useContext(GlobalStoreContext);
    let songname = "test"
    if(store.markDeleteSong && store.currentList.songs[store.markDeleteSong]){
        console.log("deletesong121: "+ store.currentList.songs[store.markDeleteSong].title)
        songname = store.currentList.songs[store.markDeleteSong].title
    }

    function handleConfirm(){
        store.deleteSong()
        store.hideDeleteSongModal()
    }

    function handleCancel(){
        store.hideDeleteSongModal()
    }

    return(
        <div class="modal" id="delete-song-modal" data-animation="slideInOutLeft">
        <div class="modal-root" id='verify-delete-list-root'>
            <div class="modal-north">
                Remove song?
            </div>                
            <div class="modal-center">
                <div class="modal-center-content">
                    Are you sure you wish to permanently Remove <span>{songname}</span><span id="delete-song-span"></span> from the playlist?
                </div>
            </div>
            <div class="modal-south">
                <input type="button" 
                       id="delete-song-confirm-button" 
                       class="modal-button" 
                       value='Confirm' 
                       onClick={handleConfirm}
                       />

                <input type="button" 
                       id="delete-song-cancel-button" 
                       class="modal-button" 
                       value='Cancel' 
                       onClick={handleCancel}
                       />
            </div>
        </div>
    </div>
       );
}

export default DeleteSongModal;


// export default class DeleteSongModal extends Component {
//     render() {
//         const { songKeyPair,deleteSongCallback, hideDeleteSongModalCallback,songId } = this.props;
//         let songname = "";
//         let artistname = "";
//         if (songKeyPair && songId &&songKeyPair.songs[songId-1]) {
//             console.log("songId: "+ songId);
//             songname = songKeyPair.songs[songId-1].title;
//             artistname = songKeyPair.songs[songId-1].artist
//             //console.log("song: "+ songKeyPair.songs[songId-1].title);
//         }

//        return(
//         <div class="modal" id="delete-song-modal" data-animation="slideInOutLeft">
//         <div class="modal-root" id='verify-delete-list-root'>
//             <div class="modal-north">
//                 Remove song?
//             </div>                
//             <div class="modal-center">
//                 <div class="modal-center-content">
//                     Are you sure you wish to permanently Remove <span>{songname}</span><span id="delete-song-span"></span> from the playlist?
//                 </div>
//             </div>
//             <div class="modal-south">
//                 <input type="button" 
//                        id="delete-song-confirm-button" 
//                        class="modal-button" 
//                        value='Confirm' 
//                        onClick={deleteSongCallback}
//                        />

//                 <input type="button" 
//                        id="delete-song-cancel-button" 
//                        class="modal-button" 
//                        value='Cancel' 
//                        onClick={hideDeleteSongModalCallback}
//                        />
//             </div>
//         </div>
//     </div>
//        );
//     }
    
// }