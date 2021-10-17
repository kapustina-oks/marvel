import img from './error.gif';

const ErrorMsg = () =>{
    return (
        <img style={{
            display: 'block',
            width: "250px",
            height: "250px",
            objectFit: 'contain',
            magin: "0 auto"
        }} src={img} alt="error"/>
    )
}
export default ErrorMsg;



//работа со стативными картинками в папке public
/* const ErrorMsg =() =>{
    return (
        <img src={process.env.PUBLIC_URL + '/error.gif'}/>
    )
} */