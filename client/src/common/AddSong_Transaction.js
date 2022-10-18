import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
    }

    doTransaction() {
        this.store.addNewSong()
    }
    
    undoTransaction() {
        console.log("get into undo function")
        let DeleteId = this.store.currentList.songs.length-1;
        console.log("deleteID: "+ DeleteId)
        this.store.deleteSongByIndex(DeleteId)
    }
}