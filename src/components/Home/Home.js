import images from "../../assets/images";
import styles from '../Home/Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Home() {
    return ( <>
        <img className={cx('home-image')} src={images.background} alt="logo" />
    </>);
}

export default Home;