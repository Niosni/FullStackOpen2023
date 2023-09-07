import Content from "./Content";
import CourseHeader from "./CourseHeader";
import Total from './Total'


const Course = ({course}) => {
    return (
        <div>
            <CourseHeader course={course}/>
            <Content course={course}/>
            <Total course={course} />
        </div>
    )
}

export default Course