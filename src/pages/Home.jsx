import Movies from "./Movies"
export default function Home() {

    return(
        <>
            <div className="text-center m-5 justify-content-center">
            <h1 className="fw-bold text-danger">Welcome to Movie Catalog.</h1>
            <h3 className="fw-bold text-danger">Browse your favorite movies</h3>
            <Movies />
            </div>
        </>
    )
}