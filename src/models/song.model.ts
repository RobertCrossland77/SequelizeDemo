import { 
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';
import { Album } from './album.model';
import { Lyric } from './lyric.model';

@Table({tableName: 'songs'})
export class Song extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull
  @Unique
  @Column
  name: string;

  @ForeignKey(_ => Album)
  @Column
  album_id: number;

  @BelongsTo(_ => Album)
  album: Album;

  @HasOne(_ => Lyric)
  lyrics: Lyric;
}