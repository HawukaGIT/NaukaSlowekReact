import Word from "./Word";

function Words(props) {
  let wordsList = props.words.map((el) => {
    return <Word key={el._id} word={el} />;
  });

  return <div>{wordsList}</div>;
}

export default Words;
