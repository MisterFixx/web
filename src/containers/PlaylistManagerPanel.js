import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  isSelectedPlaylistLoadingSelector,
  isFilteredSelector,
} from '../selectors/playlistSelectors';
import { openPreviewMediaDialog } from '../actions/DialogActionCreators';
import {
  addMediaMenu,
  editMedia,
  moveMedia,
  removeMedia,
  filterPlaylistItems,
  renamePlaylist,
  deletePlaylist,
  cannotDeleteActivePlaylist,
  shufflePlaylist,
  activatePlaylist,
  loadPlaylist,
  loadFilteredPlaylistItems,
} from '../actions/PlaylistActionCreators';
import PlaylistPanel from '../components/PlaylistManager/Panel';

const { useCallback } = React;

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [media];
};

function PlaylistPanelContainer() {
  const playlist = useSelector(selectedPlaylistSelector);
  const playlistItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const loading = useSelector(isSelectedPlaylistLoadingSelector);
  const isFiltered = useSelector(isFilteredSelector);
  const dispatch = useDispatch();

  const onShufflePlaylist = useCallback(() => dispatch(shufflePlaylist(playlist._id)), [playlist]);
  const onActivatePlaylist = useCallback(
    () => dispatch(activatePlaylist(playlist._id)),
    [playlist],
  );
  const onRenamePlaylist = useCallback(
    (name) => dispatch(renamePlaylist(playlist._id, name)),
    [playlist],
  );
  const onDeletePlaylist = useCallback(() => dispatch(deletePlaylist(playlist._id)), [playlist]);
  const onNotDeletable = useCallback(
    () => dispatch(cannotDeleteActivePlaylist(playlist._id)),
    [playlist],
  );

  const onOpenAddMediaMenu = useCallback((position, media, selection) => (
    dispatch(addMediaMenu(selectionOrOne(media, selection), position))
  ), [playlist]);
  const onOpenPreviewMediaDialog = useCallback((media) => dispatch(openPreviewMediaDialog(media)));
  const onMoveToFirst = useCallback((media, selection) => (
    dispatch(moveMedia(playlist._id, selectionOrOne(media, selection), { at: 'start' }))
  ), [playlist]);
  const onMoveToLast = useCallback((media, selection) => (
    dispatch(moveMedia(playlist._id, selectionOrOne(media, selection), { at: 'end' }))
  ), [playlist]);
  const onMoveMedia = useCallback(
    (media, opts) => dispatch(moveMedia(playlist._id, media, opts)),
    [playlist],
  );
  const onEditMedia = useCallback((media) => dispatch(editMedia(playlist._id, media)), [playlist]);
  const onRemoveFromPlaylist = useCallback((media, selection) => (
    dispatch(removeMedia(playlist._id, selectionOrOne(media, selection)))
  ), [playlist]);
  const onLoadPlaylistPage = useCallback((page) => {
    if (isFiltered) {
      return dispatch(loadFilteredPlaylistItems(playlist._id, page));
    }
    return dispatch(loadPlaylist(playlist._id, page));
  }, [isFiltered, playlist]);
  const onFilterPlaylistItems = useCallback(
    (filter) => dispatch(filterPlaylistItems(playlist._id, filter)),
    [playlist],
  );

  return (
    <PlaylistPanel
      playlist={playlist}
      media={playlistItems}
      loading={loading}
      isFiltered={isFiltered}
      onShufflePlaylist={onShufflePlaylist}
      onActivatePlaylist={onActivatePlaylist}
      onRenamePlaylist={onRenamePlaylist}
      onDeletePlaylist={onDeletePlaylist}
      onNotDeletable={onNotDeletable}
      onOpenAddMediaMenu={onOpenAddMediaMenu}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
      onMoveToFirst={onMoveToFirst}
      onMoveToLast={onMoveToLast}
      onMoveMedia={onMoveMedia}
      onEditMedia={onEditMedia}
      onRemoveFromPlaylist={onRemoveFromPlaylist}
      onLoadPlaylistPage={onLoadPlaylistPage}
      onFilterPlaylistItems={onFilterPlaylistItems}
    />
  );
}

export default PlaylistPanelContainer;
