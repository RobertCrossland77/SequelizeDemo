import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Lyric } from '../models/lyric.model';
import { Song } from '../models/song.model';
import { Album, AlbumInsertDto } from '../models/album.model';
import { Artist, ArtistInsertDto, ArtistUpdateDto } from '../models/artist.model';
import { ArtistAlbum } from '../models/artist-albums.model';

@Injectable()
export class ArtistService {
    constructor(
        @InjectModel(Artist)
        private artistModel: typeof Artist,
        @InjectModel(Album)
        private albumModel: typeof Album,
        @InjectModel(ArtistAlbum)
        private artistAlbumModel: typeof ArtistAlbum,
    ) {}

    create = (artist: ArtistInsertDto) =>
        this.artistModel.create(artist);

    addAlbum = async(artist_id: number, album: AlbumInsertDto) => {
        const artist = await Artist.findByPk(artist_id);
        const newAlbum = await Album.create({
            ...album as Album, artist_id: artist_id
        });
        return ArtistAlbum.create({
            artist_id: artist.id,
            album_id: newAlbum.id
        });
    }

    artists = async(skip?: number, take?: number, search?: string): Promise<Artist[]> =>
        this.artistModel.findAll({
            offset: skip,
            limit: take,
            include: [
                {
                    model: Album, as: Album.tableName,
                    include: [
                        {
                            model: Song, as: Song.tableName,
                            include: [
                                {model: Lyric, as: Lyric.tableName}
                            ]
                        }
                    ]
                } 
            ],
            where: search ? {
                name: {
                    [Op.like]: `%${search}%`
                }
            } : undefined
        });
        
    artist = (id: number): Promise<Artist> =>
        this.artistModel.findByPk(id);

    update = async(id: number, artist: ArtistUpdateDto) => 
        this.artistModel.update(artist, {where: {id: id}});
    
    delete = async(id: number) => 
      (await (this.artistModel.findByPk(id))).destroy();
}
