import styles from './LoadingCat.module.css';

const LoadingCat: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F10%2F11%2F18%2F17%2Forange-tabby-cat-1732376_1280.png&f=1&nofb=1&ipt=44b78795f5777239e61ea51ef5c5598d4ca2cea00c7c992db3cfd5c525b3f850&ipo=images"
          alt="Gato naranja"
          className={styles.cat}
        />
      </div>
      <p className={styles.loadingText}>Cargando...</p>
    </div>
  );
};

export default LoadingCat;
