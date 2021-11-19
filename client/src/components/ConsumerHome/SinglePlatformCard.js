export default function SinglePlatformCard({ platformData }) {
  return (
    <div class='card' style={{ width: '18rem' }}>
      <img src={platformData.platformImage} class='card-img-top' alt='...' />
      <div class='card-body'>
        <h5 class='card-title'>{platformData.platformName}</h5>
        <p class='card-text'>{platformData.platformDescription}</p>
        <a href='#' class='btn btn-primary'>
          Go somewhere
        </a>
      </div>
    </div>
  );
}
