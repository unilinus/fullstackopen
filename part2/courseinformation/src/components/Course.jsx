const Course = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
            {props.course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        </div>
    )
}


export default Course