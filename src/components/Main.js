import './Main.css';

function Main(props) {
  return (

    <main className="content">
      <section className="profile">
        <button className="profile__add-button" type="button" onClick={props.onAddPost}>Добавить пост</button>
      </section>
      <ul className="cards">
        {props.cards}
      </ul>
    </main>
  );
}

export default Main;