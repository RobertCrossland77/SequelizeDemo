import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Lyric, LyricUpdateDto } from '../models/lyric.model';

@Injectable()
export class LyricService {
    constructor(
        @InjectModel(Lyric)
        private lyricModel: typeof Lyric,
    ) {}

    lyrics = async(skip?: number, take?: number, search?: string): Promise<Lyric[]> =>
        this.lyricModel.findAll({
            offset: skip,
            limit: take,
            where: search ? {
                content: {
                    [Op.like]: `%${search}%`
                }
            } : undefined
        });
        
    lyric = (id: number): Promise<Lyric> =>
        this.lyricModel.findByPk(id);

    update = async(id: number, lyric: LyricUpdateDto) => 
        this.lyricModel.update(lyric, {where: {id: id}});
    
    delete = async(id: number) => 
      (await (this.lyricModel.findByPk(id))).destroy();
}
