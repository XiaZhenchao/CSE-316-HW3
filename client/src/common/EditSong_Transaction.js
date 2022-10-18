import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Zhenchao Xia
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, index,oldSong,newSong) {
        super();
        this.store = store;
        this.index = index;
        this.oldSong = oldSong;
        this.newSong = newSong;
    }

    doTransaction() {
        this.store.renameSongById(this.index,this.newSong);
    }
    
    undoTransaction() {
        this.store.renameSongById(this.index,this.oldSong);
    }
}