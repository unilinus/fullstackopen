const Course = (props) => {
    
    return (
        <div>
            <h1>{props.course.name}</h1>
            {props.course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
            <p><b>total of {props.course.parts.reduce((accum,item) => accum + item.exercises, 0)} exercises</b></p>
        </div>
    )
}


export default Course