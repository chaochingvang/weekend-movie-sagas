import { useHistory } from "react-router";

function MovieForm() {

    const history = useHistory();

    const handleSubmit = () => {

    }

    return (<>
        <h1>MOVIE FORM COMPONENT</h1>
        <button onClick={() => history.push(`/`)}>Back</button>
        


        <form onSubmit={handleSubmit}>


        </form>
    </>)
}

export default MovieForm;