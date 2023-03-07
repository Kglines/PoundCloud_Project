import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../../store/albums';
import AlbumListItem from '../AlbumListItem';

function AlbumList() {
    const dispatch = useDispatch();

    const albums = useSelector(state => state.albums);

    useEffect(() => {
        dispatch(fetchAlbums(albums))
    }, [dispatch])
  return (
    // <div>
    //   {albums.map((album) => (
    //     <div className='album-card'>
          {/* <AlbumListItem album={album} /> */}
    //     </div>
    //   ))}
    // </div>
  );
}

export default AlbumList;
