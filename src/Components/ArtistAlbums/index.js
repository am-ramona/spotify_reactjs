import React, { Component } from 'react'
import Responsive from 'react-responsive'
import * as $ from 'jquery'
import './styles.css'

const Desktop = props => <Responsive {...props} minWidth={857} />
const Tablet = props => <Responsive {...props} minWidth={400} maxWidth={856} />
const Mobile = props => <Responsive {...props} maxWidth={399} />
// const Default = props => <Responsive {...props} minWidth={400} />

export default class ArtistSearch extends Component {
 
 constructor(props) {
    super(props);
    this.state = {
      name:'',
      AlbumDetails:[],
      selectedArtistName: ''
    };
  }

  componentDidMount() {
   const { token } = this.props.location.state
   this.getArtistAlbums(this.props.match.params.id, token)
  }

  getArtistAlbums(id, token){ 
     $.ajax({
          url: "https://api.spotify.com/v1/artists/"+id+"/albums",
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: (data) => {
            console.log("success")
            this.setState({ AlbumDetails: data.items })
          }
        });
  }

    getListOfArtists(albumArtists){ 
      let listOfArtists = []
      albumArtists.forEach((oneArtist) => { 
        listOfArtists.push(
          <p key={oneArtist.id}>{oneArtist.name}</p>        
      )
     })
       return listOfArtists
    }

  render() {
        let { AlbumDetails } = this.state
        let albumDetailsList = []

        AlbumDetails.forEach((oneAlbum) => {
            albumDetailsList.push(
                <div key={oneAlbum.id} id={oneAlbum.id} className='albumCard'>
                    <img className='albumImage' src={oneAlbum.images[1]?oneAlbum.images[1].url:null} alt=''/>
                    <div className='albumName'> {oneAlbum.name} </div>
                    <div className='artistsListonAlbum'> {this.getListOfArtists(oneAlbum.artists)}</div>
                    <div className='albumReleaseYear'> {oneAlbum.release_date}</div>
                    <div className='totalTracksNb'> {oneAlbum.total_tracks} tracks</div>
                    <a className='previewOnSpotifyLink' href={oneAlbum.external_urls.spotify} alt='spotifyPreview' target='_blank' rel='noopener noreferrer'>Preview on Spotify</a>
                </div >
            )
        })

     return (
       <div className="spotifyArtistSearchApp">
          <Desktop>
              <div className='listOfAlbumsContainer'>
                <div className='header'>
                  <p className='artistName'>{this.props.match.params.name}</p>
                  <p className='title'>Albums</p>
                </div>
                <div className='albumsList'>{albumDetailsList}</div>
              </div>
          </Desktop>

          <Tablet>
              <div className='listOfAlbumsContainer'>
                <div className='header'>
                  <p className='artistName'>{this.props.match.params.name}</p>
                  <p className='title'>Albums</p>
                </div>
                <div className='albumsList albumsListResponsive'>{albumDetailsList}</div>
              </div>
          </Tablet>

          <Mobile>
              <div className='listOfAlbumsContainer'>
                <div className='header'>
                  <p className='artistName'>{this.props.match.params.name}</p>
                  <p className='title'>Albums</p>
                </div>
                <div className='albumsList albumsListResponsive'>{albumDetailsList}</div>
              </div>
          </Mobile>

       </div>
     )
  }
}
