import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { SongService } from './song/song.service';
import { LyricService } from './lyric/lyric.service';
import { LyricController } from './lyric/lyric.controller';
import { SongController } from './song/song.controller';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { Artist } from './models/artist.model';
import { ArtistAlbum } from './models/artist-albums.model';
import { Song } from './models/song.model';
import { Lyric } from './models/lyric.model';
import { Album } from './models/album.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sequelize-demo',
      models: [Artist, Album, ArtistAlbum, Song, Lyric],
      autoLoadModels: true,
      synchronize: true
    }),
    SequelizeModule.forFeature([Artist, Album, ArtistAlbum, Song, Lyric])
  ],
  controllers: [LyricController, SongController, AlbumController, ArtistController],
  providers: [ArtistService, AlbumService, SongService, LyricService],
})
export class AppModule {}
