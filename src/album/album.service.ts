import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Album, AlbumUpdateDto } from '../models/album.model';
import { Song, SongInsertDto } from '../models/song.model';

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album)
        private albumModel: typeof Album,
    ) {}

    addSong = async(album_id: number, song: SongInsertDto) => {
        const album = await Album.findByPk(album_id);
        return await Song.create({
            ...song as Song, album_id: album_id
        });
    }

    albums = async(skip?: number, take?: number, search?: string): Promise<Album[]> =>
        this.albumModel.findAll({
            offset: skip,
            limit: take,
            where: search ? {
                title: {
                    [Op.like]: `%${search}%`
                }
            } : undefined
        });
        
    album = (id: number): Promise<Album> =>
        this.albumModel.findByPk(id);

    update = async(id: number, album: AlbumUpdateDto) => 
        this.albumModel.update(album, {where: {id: id}});
    
    delete = async(id: number) => 
      (await (this.albumModel.findByPk(id))).destroy();
}
