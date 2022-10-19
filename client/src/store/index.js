import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveSong_Transaction from '../common/MoveSong_Transaction';
import AddSong_Transaction from '../common/AddSong_Transaction';
import DeleteSong_Transaction from '../common/DeleteSong_Transaction.js';
import EditSong_Transaction from '../common/EditSong_Transaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    UPDATE_CURRENT_LIST:"UPDATE_CURRENT_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_DELETE_LIST: "MARK_DELETE_LIST",
    MARK_DELETE_SONG: "MARK_DELETE_SONG",
    MARK_RENAME_SONG: " MARK_RENAME_SONG",
    MODAL_STATE: "MODAL_STATE",
    // MARK_EDIT_SONG:"MARK_EDIT_SONG",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markDeleteList: null,
        markDeleteSong: null,
        markRenameSong: null,
        modalState:false,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: null,
                    markRenameSong: null,
                    modalState:false,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: null,
                    markRenameSong: null,
                    modalState: store.modalState,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: null,
                    modalState: store.modalState,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: store.markRenameSong,
                    modalState: store.modalState,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: payload,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: store.markRenameSong,
                    modalState: store.modalState,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: store.markRenameSong,
                    modalState: store.modalState,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: store.markRenameSong,
                    modalState: store.modalState,
                });
            }
            case GlobalStoreActionType.UPDATE_CURRENT_LIST:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: store.markRenameSong,
                    modalState: store.modalState,
                });
            }
            case GlobalStoreActionType.MARK_DELETE_SONG:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: payload,
                    markRenameSong: store.markRenameSong,
                    modalState: store.modalState,
                });
            }
            case GlobalStoreActionType.MARK_RENAME_SONG:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: payload,
                    modalState: true,
                });
            }
            case GlobalStoreActionType.MODAL_STATE:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: store.markDeleteList,
                    markDeleteSong: store.markDeleteSong,
                    markRenameSong: store.markRenameSong,
                    modalState: payload
                });
            }
            default:
                return store;
        }
    }

    store.deletelist =  function(){
        let id = store.markDeleteList._id
        let name = store.markDeleteList.name
        console.log("deletelist: "+ this.currentList)
        async function deletelist(id){
            let response = await api.deletePlaylistById(id);
            let name = store.markDeleteList.name
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: name
            });     
           // store.setCurrentList(newListId);   
           store.loadIdNamePairs() 
        }
        deletelist(id);
    }

    store.showDeleteListModal = function (id){
        let markedList = store.idNamePairs.filter(list => list._id === id)[0];
        let modal = document.getElementById("delete-list-modal");
        
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: markedList
        });

        modal.classList.add("is-visible");
    }

    store.hideDeleteListModal = function (){
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    store.showDeleteSongModal = function(index){
        let modal = document.getElementById("delete-song-modal");
        storeReducer({
            type: GlobalStoreActionType.MARK_DELETE_SONG,
            payload: index
        });     

        storeReducer({
            type: GlobalStoreActionType.MODAL_STATE,
            payload: true
        });

        //console.log("show delete song modal: "+ store.markDeleteSong)
        modal.classList.add("is-visible");
    }

    store.hideDeleteSongModal = function(){
        let modal = document.getElementById("delete-song-modal");

        storeReducer({
            type: GlobalStoreActionType.MODAL_STATE,
            payload: false
        });
        modal.classList.remove("is-visible");
    }

    store.showRenameSongModal = function(index){
        let modal = document.getElementById("edit-song-modal");
        storeReducer({
            type:GlobalStoreActionType.MARK_RENAME_SONG,
            payload: index
        });
        modal.classList.add("is-visible");
    }

    store.hideRenameSongModal = function(){
        let modal = document.getElementById("edit-song-modal");
        storeReducer({
            type: GlobalStoreActionType.MODAL_STATE,
            payload: false
        });
        console.log("getin")
        console.log("store.modalState: "+ store.modalState)
        modal.classList.remove("is-visible");
    }

 
  
    store.createNewList = function (){
        let newlist = {
            name:"Untitled",
            songs:[]
        }
        async function asyncCreateNewList(){
            let response = await api.createPlaylist(newlist);
            let playlist=response.data.playlist;
            let newListId=playlist._id;
           
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: playlist
            });     
            store.setCurrentList(newListId);                                           
        }
        asyncCreateNewList();
        
    }

    store.addNewSong = async function(){
        let newSong = {
            artist: "Unknown", title: "Untitled", youTubeId: "dQw4w9WgXcQ"
        }
        this.currentList.songs.push(newSong)
            await api.updatePlaylistById(this.currentList._id,this.currentList)
            // storeReducer({
            //     type: GlobalStoreActionType.UPDATE_CURRENT_LIST,
            //     payload: this.currentList
            // });    
            store.setCurrentList(this.currentList._id) 
    }

    store.deleteSong = async function(){
        this.currentList.songs.splice(this.markDeleteSong,1);
        await api.updatePlaylistById(this.currentList._id,this.currentList)
        storeReducer({
            type: GlobalStoreActionType.UPDATE_CURRENT_LIST,
            payload: this.currentList
        });     
    }

    store.deleteSongByIndex = async function(index){
        console.log("deleteSongByIndex")
        this.currentList.songs.splice(index,1);
        await api.updatePlaylistById(this.currentList._id,this.currentList)
        storeReducer({
            type: GlobalStoreActionType.UPDATE_CURRENT_LIST,
            payload: this.currentList
        });     
    }

   store.RedodeleteSong = async function(index, deleteSong) {
        this.currentList.songs.splice(index,0,deleteSong)
        await api.updatePlaylistById(this.currentList._id,this.currentList)
        storeReducer({
            type: GlobalStoreActionType.UPDATE_CURRENT_LIST,
            payload: this.currentList
        });     
    }


    store.renameSong = async function(){
        let newSongName = document.getElementById("edit-song-modal-title-textfield").value;
        let newArtistName = document.getElementById("edit-song-modal-artist-textfield").value;
        let newyoutubeId = document.getElementById("edit-song-modal-youTubeId-textfield").value;
        let newSong = {title: newSongName, artist: newArtistName, youTubeId: newyoutubeId}
        console.log("NEW SONG: "+ newSong.title + " " + newSong.artist+ " " + newSong.youTubeId);
        this.currentList.songs.splice(this.markRenameSong,1, newSong)
        await api.updatePlaylistById(this.currentList._id,this.currentList)
        store.setCurrentList(this.currentList._id) 
    }




    store.renameSongById = async function(Id,newSong){
        this.currentList.songs.splice(Id,1, newSong)
        await api.updatePlaylistById(this.currentList._id,this.currentList)
        store.setCurrentList(this.currentList._id) 
    }


    store.moveSong = async function(start, end) {
        let list = this.currentList;
        start = start.substring(0,1)
        end = end.substring(0,1)
        // console.log("list: "+ list.songs)
        // console.log("stat song: "+ list.songs[start].title)
        // console.log("end song: "+ list.songs[end].title)
        // WE NEED TO UPDATE THE STATE FOR THE APP
        // start -= 1;
        // end -= 1;
        // console.log("start: "+ start)
        // console.log("end: "+ end)
        // if (start < end) {
        //     let temp = list.songs[start];
        //     for (let i = start; i < end; i++) {
        //         list.songs[i] = list.songs[i + 1];
        //     }
        //     list.songs[end] = temp;
        // }
        // else if (start > end) {
        //     let temp = list.songs[start];
        //     for (let i = start; i > end; i--) {
        //         list.songs[i] = list.songs[i - 1];
        //     }
        //     list.songs[end] = temp;
        // }
        let temp = list.songs[start]
        list.songs[start] = list.songs[end]
        list.songs[end] = temp

        await api.updatePlaylistById(this.currentList._id,this.currentList)
        store.setCurrentList(this.currentList._id) 
    }

    



    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        console.log("get in here")
        tps.clearAllTransactions();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    store.hasTransactionToRedo = function(){
        return tps.hasTransactionToRedo()
    }

    store.hasTransactionToUndo = function(){
        return tps.hasTransactionToUndo()
    }


    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(this, start, end);
        tps.addTransaction(transaction);
    }

    store.addAddSongTransaction = function(){
        let transaction = new AddSong_Transaction(this);
        tps.addTransaction(transaction);
    }

    store.addDeleteSongTransaction = function(){
        let transaction = new DeleteSong_Transaction(this);
        tps.addTransaction(transaction)
    }

    store.addEditSongTransaction = function(index){
        let OldSongName = this.currentList.songs[index].title;
        let OldArtistName = this.currentList.songs[index].artist;
        let OldyoutubeId = this.currentList.songs[index].youTubeId;
        let oldSong = {title: OldSongName, artist: OldArtistName, youTubeId: OldyoutubeId}

        let newSongName = document.getElementById("edit-song-modal-title-textfield").value;
        let newArtistName = document.getElementById("edit-song-modal-artist-textfield").value;
        let newyoutubeId = document.getElementById("edit-song-modal-youTubeId-textfield").value;
        let newSong = {title: newSongName, artist: newArtistName, youTubeId: newyoutubeId}
        let transaction = new EditSong_Transaction(this,index,oldSong,newSong)
        tps.addTransaction(transaction);
    }

    store.ShortcutDetect = function() {
        console.log("get into shortcut")
        function KeyPress(event, app) {
            console.log("get into KeyPress")
            if (event.key === "z" && event.ctrlKey){
                app.undo();
                console.log("undo");
            }
            if (event.key === "y" && event.ctrlKey){
                app.redo();
                console.log("redo");
            } 
    }
    document.onkeydown = (e) => KeyPress(e,this);
    }
   

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}