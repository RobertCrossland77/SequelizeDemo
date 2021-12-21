import { 
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';
import { Song } from './song.model';

@Table({tableName: 'lyrics'})
export class Lyric extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull
  @Unique
  @Column
  content: string;

  @ForeignKey(_ => Song)
  @Column
  song_id: number;

  @BelongsTo(_ => Song)
  song: Song;
}

export type LyricUpdateDto = Omit<Partial<Lyric>, 'id'>;
export type LyricInsertDto = Pick<Lyric, 'content'>;