import { Column, ForeignKey, Table, Model } from "sequelize-typescript";
import { Album } from "./album.model";
import { Artist } from "./artist.model";

@Table({tableName: 'artist_albums'})
export class ArtistAlbum extends Model {
  @ForeignKey(_ => Artist)
  @Column
  artist_id: number

  @ForeignKey(_ => Album)
  @Column
  album_id: number
}