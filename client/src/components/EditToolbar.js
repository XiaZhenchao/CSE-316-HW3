import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    function handleAddSong(){
       // store.addNewSong();
        store.addAddSongTransaction();
    }

    let addButtonState = false
    let closeButtonState = false
    let redoButtonState = false
    let undoButtonState = false

    if(store.currentList == null || store.modalState )
    {
        addButtonState = true
    }

    if(store.currentList == null|| store.modalState)
    {
        closeButtonState = true
    }
    

    if(store.currentList == null || !store.hasTransactionToRedo() || store.modalState)
    {
        redoButtonState = true
    }

    if(store.currentList == null || !store.hasTransactionToUndo() || store.modalState)
    {
        undoButtonState = true
    }



    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={addButtonState}
                value="+"
                className={enabledButtonClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={undoButtonState}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={redoButtonState}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={closeButtonState}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;