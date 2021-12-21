import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Album, AlbumInsertDto } from '../models/album.model';
import { Artist, ArtistInsertDto, ArtistUpdateDto } from '../models/artist.model';

@Injectable()
export class ArtistService {
    constructor(
        @InjectModel(Artist)
        private artistModel: typeof Artist,
    ) {}

    create = (artist: ArtistInsertDto) =>
        this.artistModel.create(artist);

    addAlbum = async(artist_id: number, album: AlbumInsertDto) => {
        const artist = await this.artistModel.findByPk(artist_id);
        artist.albums = [...artist.albums, album as Album];
        return this.artistModel.update(artist, { where: { id: artist_id }});
    }

    artists = async(skip?: number, take?: number, search?: string): Promise<Artist[]> =>
        this.artistModel.findAll({
            offset: skip,
            limit: take,
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
