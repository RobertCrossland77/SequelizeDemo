import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { Song, SongUpdateDto } from '../models/song.model';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) {}

    @Get(':id')
    async GetById(@Param('id') id: number): Promise<Song> {
      return this.songService.song(id);
    }
  
    @Get()
    read(
      @Query('skip') skip?: number,
      @Query('take') take?: number,
      @Query('search') search?: string,
    ) {
      return this.songService.songs(skip, take, search);
    }

    @Put(':id')
    async Update(@Param('id') id: number, @Body() song: SongUpdateDto) {
      return this.songService.update(id, song);
    }
  
    @Delete(':id')
    async Delete(@Param('id') id: number) {
      return this.songService.delete(id);
    } 
}
