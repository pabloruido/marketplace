import { Link } from "react-router-dom"

export function NoMatch () {
    return (
        <div>
            <h2>Error 404 - Not found </h2>
            <Link to="/"> volve a la pagina principal </Link>
        </div>
        )
}