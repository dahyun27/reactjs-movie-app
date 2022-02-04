import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import styles from "./Details.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <h1 className={styles.details_title}>Details</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className={styles.container}>
          <div className={styles.details}>
            <img src={detail.large_cover_image} className={styles.cover_img} />
            <div className={styles.details_container}>
              <div className={styles.title}>{detail.title_long}</div>

              <ul>
                {detail.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <div>{`Like Count : ${detail.like_count}`}</div>
              <div>{`Rating : ${detail.rating}`}</div>
              <div>{`Runtime : ${detail.runtime}`}</div>
              <h2>Description</h2>
              <div>{detail.description_full}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
