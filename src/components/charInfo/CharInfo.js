import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/marvelSer';
import Spinner from '../spinner/spinner';
import ErrorMsg from '../error/error';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount()  {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.charLoading()
        this.marvelService
            .getCharacter(charId)
            .then(this.charLoaded)
            .catch(this.onError)
    }

    charLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    charLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () =>{
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;

        const spinner = loading ? <Spinner/> : null;
        const err = error ? <ErrorMsg/> : null;

        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {err}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let style = {'objectFit': 'cover'};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        style = {'objectFit': 'contain'}
    }

    let comicsList = 'Comics:';
    if (comics.length === 0) {
        comicsList = 'There is no comics with this character';
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={style} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">{comicsList}</div>

            <ul className="char__comics-list">

                 {  
                     comics.map((item, i) => {
                        if (i > 9) {
                            return;
                        } else {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        } 
                    })
                 }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;