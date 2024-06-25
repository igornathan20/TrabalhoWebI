import './style.css';
import { Link } from 'react-router-dom';


function Card({ title, count, link }) {
  return (
    <div className="card-home">
      <h3>{title}</h3>
      <p>{count}</p>
      <Link to={link} className="view-button">Ir até a lista{'>'}</Link>
    </div>
  );
}

export default Card;
