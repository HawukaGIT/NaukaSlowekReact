export default function Word(props) {
  return (
    <li>
      {props.word.word} : {props.word.translation}
    </li>
  );
}
