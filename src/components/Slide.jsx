export const Slide = (props) => {
  return (
    <div className="slide-item">
      <img className="slide-image" src={props.blok.image.filename} alt={props.blok.alt_text} />
      <p>{props.blok.title}</p>
    </div>
  );
};
