import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import Responsive from 'react-responsive'
import * as $ from 'jquery'
import history from '../../history'
import hash from '../../hash'
import './styles.css'

const Desktop = props => <Responsive {...props} minWidth={857} />
const Tablet = props => <Responsive {...props} minWidth={400} maxWidth={856} />
const Mobile = props => <Responsive {...props} maxWidth={399} />
// const Default = props => <Responsive {...props} minWidth={400} />

export default class ArtistSearch extends Component {

 constructor(props) {
    super(props);
    this.state = {
      token: null,
      searchResults: [],
      artistName: ''
    };
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token
      }, () =>  localStorage.setItem('token', this.state.token))
    }

    if (window.location.search === '?spotify=true'){ 
      history.push('/ArtistSearch')
      this.setState({ artistName: '',  searchResults: []})
      localStorage.removeItem('artistName')
    } else {
      if((window.localStorage.length > 0) && ( localStorage.getItem('artistName') !== null)){
        const artistName = localStorage.getItem('artistName')
        this.setState({ artistName }, () => {   
          this.searchForArtist(artistName)
        })
      }
    }
  }

  searchForArtist(name){ 

    let artistName
    if (typeof name === 'string') { 
      artistName = name
    } else { 
      artistName = name.target.value
    }

    localStorage.setItem('artistName', artistName)

    if (artistName.length > 0){
     $.ajax({
      url: "https://api.spotify.com/v1/search?q="+artistName+"&type=artist",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
      },
      success: (data) => {
        console.log("success")
        this.setState({ searchResults: data.artists.items })
      }
     });
    } else {
      this.setState({ searchResults: [] })
    }
  }

    getListOfArtists(albumArtists){ 
      let listOfArtists = []
      albumArtists.forEach((oneArtist) => { 
        listOfArtists.push(
          <p>{oneArtist.name}</p>        
      )
     })
       return listOfArtists
    }

    _handleKeyPress(e) {  
        if (e.key === 'Enter') {
          this.searchForArtist(e)
        }
      }

  render() {
        let { searchResults } = this.state
        let searchList = []

        searchResults.forEach((oneArtist) => {
            searchList.push(
                <Link to={{
                  pathname:`/${oneArtist.id}/${oneArtist.name}`,
                  state: {
                    token : `${this.state.token}`
                  }
                }} className='artistCard' key={oneArtist.id} id={oneArtist.id} >
                  <div className='artistCardContainer'>
                    <img className='artistPicture' src={oneArtist.images[1]?oneArtist.images[1].url:null} alt=''/>
                    <div className='artistName'> {oneArtist.name} </div>
                    <div className='artistFollowersNb'> {oneArtist.followers.total} followers </div>
                    <StarRatings
                        rating={oneArtist.popularity * 6 / 100}
                        starRatedColor='#de1522'
                        startEmptyColor='#d7d7d7'
                        starDimension="25px"
                        starSpacing="0px"
                        numberOfStars={5}
                        name='rating'
                    />
                </div >
              </Link>
            )
        })

     return (
       <div className="spotifyArtistSearchApp">
          <Desktop>
              <div className='container'>
               <form>
                <input type="text"
                  className="search searchForAnArtistWeb"
                  maxLength='30'
                  name='SearchForArtist'
                  defaultValue={window.localStorage.length === 2?this.state.artistName:''}
                  placeholder='Search for an artist...'
                  autoComplete="off"
                  onChange={(name) => {
                    this.searchForArtist(name)
                  }} 
                  onKeyPress={(e) => {this._handleKeyPress(e)}} />
                </form>
                  <div className='searchResults'>
                    {searchList}
                  </div>
                </div>
          </Desktop>

          <Tablet>
              <div className='container'>
               <form>
                <input type="text"
                  className="search searchForAnArtistTablet"
                  maxLength='30'
                  name='SearchForArtist'
                  defaultValue={window.localStorage.length === 2?this.state.artistName:''}
                  placeholder='Search for an artist...'
                  autoComplete="off"
                  onChange={(name) => {
                    this.searchForArtist(name)
                  }} 
                  onKeyPress={(e) => {this._handleKeyPress(e)}} />
                  </form>
                  <div className='searchResults searchTablet'>
                    {searchList}
                  </div>
                </div>
          </Tablet>

          <Mobile>
              <div className='container'>
               <form>
                <input type="text"
                  className="search searchForAnArtistMobile"
                  maxLength='30'
                  name='SearchForArtist'
                  defaultValue={window.localStorage.length === 2?this.state.artistName:''}
                  placeholder='Search for an artist...'
                  autoComplete="off"
                  onChange={(name) => {
                    this.searchForArtist(name)
                  }} 
                  onKeyPress={(e) => {this._handleKeyPress(e)}} />
                </form>
                  <div className='searchResults searchMobile'>
                    {searchList}
                  </div>
                </div>
          </Mobile>

       </div>
     )
  }
}
