import {jsTPS_Transaction} from "./jsTPS.js"
/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Zhenchao Xia
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
        this.index = null;
        this.song = null;
    }

    doTransaction() {
        if (this.index == null){
            this.index = this.store.markDeleteSong;
            this.song = {...this.store.currentList.songs[this.index]};
            console.log(this.index);
            console.log(this.song);
        }
        this.store.deleteSongByIndex(this.index)
        console.log("doTransaction")
    }
    
    undoTransaction() {
       this.store.RedodeleteSong(this.index,this.song)
       console.log("undoTransaction")
    }
}