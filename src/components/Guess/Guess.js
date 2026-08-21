function Guess(props) {
    return (
        <p className='guess'>
            {props.guess.value.map((result, index) => (
                <span key={index} className={`cell ${result.status}`}>
                    {result.letter}
                </span>
            ))}
        </p>
    );
}

export default Guess;
