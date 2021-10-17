import './charList.scss';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import ErrorMsg from '../error/error';

import { Component } from 'react';
import MarvelService from '../../services/marvelSer';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
        newItemLoading: false,
        charEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount = () => {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.charactersLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(this.charactersLoaded)
            .catch(this.onError)
    } 

  

    charactersLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    charactersLoading = () => {
        this.setState({newItemLoading: true})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    
    

    renderItem = (charList) => {
        const items = charList.map(item => {
            let style = {'objectFit': 'cover'};
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                style = {'objectFit': 'contain'}
            }
            return (
                <li className="char__item">
                    <img key={item.id} onClick={() => this.props.onCharSelected(item.id)} src={item.thumbnail} alt={item.name} style={style}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                    {items}
            </ul>
        )
        
            
    }

    render() {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state

        const spinner = loading ? <Spinner/> : null;
        const err = error ? <ErrorMsg/> : null;
        const character = this.renderItem(charList);

        const content = !(loading || error) ? character : null;

        return (
            <div className="char__list">
                {spinner}
                {err}
                {content}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style = {{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;

