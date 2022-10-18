import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    let state = {
        isDragging: false,
        draggedTo: false
    }

    let handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        state = {
            isDragging: true,
            draggedTo: state.draggedTo
        };
    }

    let handleDragOver = (event) => {
        event.preventDefault();
        state = {
            isDragging: state.isDragging,
            draggedTo: true
        };
    }

    let handleDragEnter = (event) => {
        event.preventDefault();
        state = {
            isDragging: state.isDragging,
            draggedTo: true
        };
    }
    let handleDragLeave = (event) => {
        event.preventDefault();
        state = {
            isDragging: state.isDragging,
            draggedTo: false
        };
    }
    let handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        state = {
            isDragging: false,
            draggedTo: false
        };

        console.log("sourceId: "+ sourceId)
        console.log("targetId: "+ targetId)
        store.addMoveSongTransaction(sourceId,targetId)
    }

    let handleEdit = () => {
        //store.showEditSongModal(index);
        console.log("show edition")
    }

    function handleDeleteSong(event) {
        event.stopPropagation();
        let id = event.target.id.substring("remove-song-".length)
        store.showDeleteSongModal(id)
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleEdit}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleDeleteSong}
            />
        </div>
    );
}

export default SongCard;