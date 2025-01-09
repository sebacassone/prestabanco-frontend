import styles from './LoadingCat.module.css';
import OrangeCat from '../../assets/images/orange-cat.png';

const LoadingCat: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <img src={OrangeCat} alt="Gato naranja" className={styles.cat} />
      </div>
      <p className={styles.loadingText}>Cargando...</p>
    </div>
  );
};

export default LoadingCat;
