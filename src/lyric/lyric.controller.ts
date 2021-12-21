import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { Lyric, LyricUpdateDto } from '../models/lyric.model';
import { LyricService } from './lyric.service';

@Controller('lyric')
export class LyricController {
    constructor(private readonly lyricService: LyricService) {}

    @Get(':id')
    async GetById(@Param('id') id: number): Promise<Lyric> {
      return this.lyricService.lyric(id);
    }
  
    @Get()
    read(
      @Query('skip') skip?: number,
      @Query('take') take?: number,
      @Query('search') search?: string,
    ) {
      return this.lyricService.lyrics(skip, take, search);
    }

    @Put(':id')
    async Update(@Param('id') id: number, @Body() lyric: LyricUpdateDto) {
      return this.lyricService.update(id, lyric);
    }
  
    @Delete(':id')
    async Delete(@Param('id') id: number) {
      return this.lyricService.delete(id);
    } 
}
