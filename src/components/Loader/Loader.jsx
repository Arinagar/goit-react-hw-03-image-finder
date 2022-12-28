import css from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={css.lds_ripple}>
      <div></div>
      <div></div>
    </div>
  );
};
