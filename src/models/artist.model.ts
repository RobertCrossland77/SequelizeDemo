import { AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Album } from './album.model';
import { ArtistAlbum } from './artist-albums.model';

@Table({tableName: 'artists'})
export class Artist extends Model { 
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({allowNull: false, unique: true})
  name: string;

  @BelongsToMany(_ => Album, _ => ArtistAlbum)
  albums: Array<Album>;
}

export type ArtistUpdateDto = Omit<Partial<Artist>, 'id'>;
export type ArtistInsertDto = Pick<Artist, 'name' | 'albums'>;