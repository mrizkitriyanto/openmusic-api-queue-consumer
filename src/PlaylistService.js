const {Pool} = require('pg');


class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT * FROM playlists where id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
        FROM playlist_songs
        LEFT JOIN songs ON playlist_songs.songid = songs.id
        WHERE playlistid = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistService;
