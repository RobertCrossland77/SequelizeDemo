import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AlbumInsertDto } from '../models/album.model';
import { Artist, ArtistInsertDto, ArtistUpdateDto } from '../models/artist.model';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post()
    async CreateArtist(
      @Body() artist: ArtistInsertDto
    ): Promise<Artist> {
      return this.artistService.create(artist);
    }

    @Post(':artist_id/album')
    async AddAlbum(
      @Param('artist_id') artist_id: number,
      @Body() album: AlbumInsertDto
    ) {
      return this.artistService.addAlbum(artist_id, album);
    }

    @Get(':id')
    async GetById(@Param('id') id: number): Promise<Artist> {
      return this.artistService.artist(id);
    }
  
    @Get()
    read(
      @Query('skip') skip?: number,
      @Query('take') take?: number,
      @Query('search') search?: string,
    ) {
      return this.artistService.artists(skip, take, search);
    }

    @Put(':id')
    async Update(@Param('id') id: number, @Body() artist: ArtistUpdateDto) {
      return this.artistService.update(id, artist);
    }
  
    @Delete(':id')
    async Delete(@Param('id') id: number) {
      return this.artistService.delete(id);
    } 
}
