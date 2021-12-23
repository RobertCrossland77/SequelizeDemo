import { 
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';
import { ArtistAlbum } from './artist-albums.model';
import { Artist } from './artist.model';
import { Song } from './song.model';

@Table({tableName: 'albums'})
export class Album extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;
  
  @Unique
  @Column
  title: string;

  @Column
  release_date: Date;

  @BelongsToMany(_ => Artist, _ => ArtistAlbum)
  artists: Array<Artist>;

  @HasMany(_ => Song)
  songs: Array<Song>;
}

export type AlbumUpdateDto = Omit<Partial<Album>, 'id'>;
export type AlbumInsertDto = Pick<Album, 'title' | 'songs'>;