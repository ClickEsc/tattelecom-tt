import './Main.css';

function Main(props) {
  return (
    <main className="content">
      <ul className="cards">
        {props.posts}
      </ul>
    </main>
  );
}

export default Main;