import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Song, SongUpdateDto } from '../models/song.model';

@Injectable()
export class SongService {
    constructor(
        @InjectModel(Song)
        private songModel: typeof Song,
    ) {}

    songs = async(skip?: number, take?: number, search?: string): Promise<Song[]> =>
        this.songModel.findAll({
            offset: skip,
            limit: take,
            where: search ? {
                title: {
                    [Op.like]: `%${search}%`
                }
            } : undefined
        });
        
    song = (id: number): Promise<Song> =>
        this.songModel.findByPk(id);

    update = async(id: number, song: SongUpdateDto) => 
        this.songModel.update(song, {where: {id: id}});
    
    delete = async(id: number) => 
      (await (this.songModel.findByPk(id))).destroy();
}
